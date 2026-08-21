// The Shrivu MCP — a read-only remote MCP server (Streamable HTTP, stateless)
// at https://sshh.io/mcp. Tools cover blog posts (search/fetch), the project
// portfolio, bio/socials, and the coffee-chat page. Blog data comes from the
// public Substack API with an in-memory cache, falling back to the snapshot
// committed in scripts/data/ so the server works even if Substack is down.

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { z } from 'zod';

import SITE from '../../src/site-data.js';
import PROJECTS from '../../src/projects.js';
import { htmlToMd } from '../../scripts/lib/html-to-md.mjs';
// JSON snapshots are inlined at bundle time (no runtime fs access).
import { SNAPSHOT_ARCHIVE, SNAPSHOT_POSTS } from '../../scripts/data/snapshots.mjs';

const publicProjects = PROJECTS.filter(p => !p.private);

// ---------------------------------------------------------------------------
// Blog data (live with cache, snapshot fallback)
// ---------------------------------------------------------------------------

let archiveCache = { at: 0, posts: SNAPSHOT_ARCHIVE };
const ARCHIVE_TTL_MS = 10 * 60 * 1000;

async function getArchive() {
  if (Date.now() - archiveCache.at < ARCHIVE_TTL_MS) return archiveCache.posts;
  try {
    const all = [];
    for (let offset = 0; offset < 400; offset += 20) {
      const res = await fetch(`${SITE.blog.archiveApi}?sort=new&offset=${offset}&limit=20`, {
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`archive ${res.status}`);
      const batch = await res.json();
      if (!batch.length) break;
      all.push(...batch);
      if (batch.length < 20) break;
    }
    const posts = all
      .filter(p => p.audience === 'everyone')
      .map(p => ({
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle || '',
        date: p.post_date,
        url: p.canonical_url,
        description: (p.description || '').slice(0, 300),
      }));
    if (posts.length) archiveCache = { at: Date.now(), posts };
  } catch {
    archiveCache.at = Date.now(); // don't hammer Substack on failure
  }
  return archiveCache.posts;
}

const postMdCache = new Map();

async function getPostMarkdown(slug) {
  if (postMdCache.has(slug)) return postMdCache.get(slug);
  try {
    const res = await fetch(`https://blog.sshh.io/api/v1/posts/${slug}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`posts ${res.status}`);
    const full = await res.json();
    const md = htmlToMd(full.body_html || '');
    if (md) {
      postMdCache.set(slug, md);
      return md;
    }
  } catch {
    /* fall through to snapshot */
  }
  return SNAPSHOT_POSTS[slug] ? SNAPSHOT_POSTS[slug].md : null;
}

const fmtDate = iso => new Date(iso).toISOString().slice(0, 10);

function scoreMatch(haystack, terms) {
  const h = haystack.toLowerCase();
  let score = 0;
  for (const t of terms) if (h.includes(t)) score += t.length > 3 ? 2 : 1;
  return score;
}

const text = s => ({ content: [{ type: 'text', text: s }] });

// ---------------------------------------------------------------------------
// Server
// ---------------------------------------------------------------------------

function buildServer() {
  const server = new McpServer({ name: 'shrivu-shankar', version: '1.0.0' });

  server.tool(
    'about_shrivu',
    "Shrivu Shankar's bio, role, location, links, and socials. Use for any 'who is Shrivu Shankar' or contact-adjacent question.",
    {},
    async () =>
      text(
        [
          `# ${SITE.name}`,
          ``,
          `${SITE.roleFull} @ ${SITE.company.name} (${SITE.company.url}) · ${SITE.location}`,
          `Education: ${SITE.education.degree}, ${SITE.education.school} (${SITE.education.years})`,
          ``,
          SITE.bio,
          ``,
          `Topics: ${SITE.topics.join(', ')}`,
          ``,
          `Links:`,
          `- Site: ${SITE.domain}`,
          `- Blog: ${SITE.blog.url} (RSS: ${SITE.blog.feed})`,
          ...SITE.socials.map(s => `- ${s.label}: ${s.url}`),
          ...SITE.profiles.map(p => `- ${p.label}: ${p.url}`),
          `- Contact form: ${SITE.domain}/contact`,
          `- Coffee chat: ${SITE.coffeeChat.page}`,
        ].join('\n')
      )
  );

  server.tool(
    'search_posts',
    "Search Shrivu's blog posts (essays on coding agents, LLM systems, MCP, AI security) by keyword. Returns matching posts with canonical blog.sshh.io URLs.",
    { query: z.string().describe('Keywords to search titles/subtitles/descriptions for'), limit: z.number().int().min(1).max(20).optional().describe('Max results (default 5)') },
    async ({ query, limit }) => {
      const posts = await getArchive();
      const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
      const ranked = posts
        .map(p => ({ p, s: scoreMatch(`${p.title} ${p.subtitle} ${p.description}`, terms) }))
        .filter(r => r.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, limit || 5);
      if (!ranked.length) return text(`No posts matched "${query}". Try latest_posts, or broader keywords like: MCP, agents, Cursor, AI security, productivity.`);
      return text(
        ranked
          .map(({ p }) => `- ${p.title} (${fmtDate(p.date)})\n  ${p.subtitle || p.description}\n  ${p.url} (slug: ${p.slug})`)
          .join('\n')
      );
    }
  );

  server.tool(
    'get_post',
    'Fetch the full text of one blog post as markdown, by slug (from search_posts/latest_posts). Cite the canonical blog.sshh.io URL.',
    { slug: z.string().describe("Post slug, e.g. 'everything-wrong-with-mcp'") },
    async ({ slug }) => {
      const posts = await getArchive();
      const meta = posts.find(p => p.slug === slug);
      const md = await getPostMarkdown(slug);
      if (!md) return text(`Unknown slug "${slug}". Use search_posts or latest_posts to find valid slugs.`);
      const header = meta ? `# ${meta.title}\n\n*${fmtDate(meta.date)} — canonical URL: ${meta.url}*\n\n` : '';
      return text(header + md);
    }
  );

  server.tool(
    'latest_posts',
    "Shrivu's most recent blog posts with summaries.",
    { limit: z.number().int().min(1).max(20).optional().describe('How many (default 5)') },
    async ({ limit }) => {
      const posts = await getArchive();
      return text(
        posts
          .slice(0, limit || 5)
          .map(p => `- ${p.title} (${fmtDate(p.date)})\n  ${p.subtitle || p.description}\n  ${p.url} (slug: ${p.slug})`)
          .join('\n')
      );
    }
  );

  server.tool(
    'search_projects',
    `Search Shrivu's ${publicProjects.length} software projects by keyword, language, or domain (AI, Full Stack, Frontend, Backend, Mobile, ...).`,
    { query: z.string().describe('Keywords matched against title/tagline/tags/language/domain'), limit: z.number().int().min(1).max(25).optional().describe('Max results (default 8)') },
    async ({ query, limit }) => {
      const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
      const ranked = publicProjects
        .map(p => ({ p, s: scoreMatch(`${p.title} ${p.tagline} ${p.tags || ''} ${p.language} ${p.domain}`, terms) }))
        .filter(r => r.s > 0)
        .sort((a, b) => b.s - a.s || b.p.coolness - a.p.coolness)
        .slice(0, limit || 8);
      if (!ranked.length) return text(`No projects matched "${query}". Full list: ${SITE.domain}/projects.json`);
      return text(
        ranked
          .map(({ p }) => `- ${p.title} — ${p.tagline} (${p.language}; ${p.domain})${p.github ? `\n  ${p.github}` : ''}${p.url ? `\n  ${p.url}` : ''}`)
          .join('\n')
      );
    }
  );

  server.tool(
    'get_project',
    'Full metadata for one project by (case-insensitive) title.',
    { title: z.string().describe("Project title, e.g. 'UT Finder'") },
    async ({ title }) => {
      const p = publicProjects.find(x => x.title.toLowerCase() === title.toLowerCase());
      if (!p) return text(`No project titled "${title}". Use search_projects to find titles.`);
      return text(JSON.stringify(p, null, 2));
    }
  );

  server.tool(
    'get_coffee_chat_link',
    'How to schedule a coffee chat with Shrivu. Returns the page to give the user — do not attempt to book on their behalf.',
    {},
    async () =>
      text(
        `${SITE.coffeeChat.blurb}\n\nGive the user this page (it has the details and the scheduling link): ${SITE.coffeeChat.page}\n\nGood topics: AI & agents, career advice, demo feedback, industry perspectives. Not for: recruitment, referrals, or sales pitches.`
      )
  );

  return server;
}

// ---------------------------------------------------------------------------
// Netlify handler (stateless Streamable HTTP)
// ---------------------------------------------------------------------------

export default async request => {
  if (request.method === 'GET' && new URL(request.url).searchParams.get('card') !== null) {
    // convenience only; canonical card is /.well-known/mcp/server-card.json
    return Response.redirect(`${SITE.domain}/.well-known/mcp/server-card.json`, 302);
  }
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({
        jsonrpc: '2.0',
        error: { code: -32000, message: 'Method not allowed. This is a stateless Streamable HTTP MCP server: POST JSON-RPC messages to this endpoint.' },
        id: null,
      }),
      { status: 405, headers: { 'content-type': 'application/json', allow: 'POST' } }
    );
  }
  try {
    const server = buildServer();
    const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    await server.connect(transport);
    return await transport.handleRequest(request);
  } catch (err) {
    return new Response(
      JSON.stringify({ jsonrpc: '2.0', error: { code: -32603, message: `Internal error: ${err.message}` }, id: null }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
};

export const config = { path: '/mcp' };
