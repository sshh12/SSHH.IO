// Post-build step: generates the machine-readable "agent surface" into dist/.
// Runs after `vite build` (see package.json). Never fails the deploy: network
// errors fall back to the committed snapshot in scripts/data/.
//
// Emits: sitemap.xml, llms.txt, llms-full.txt, *.md mirrors, projects.json,
// .well-known/{api-catalog,ai-catalog.json,agent-skills/*}, static pages
// (/about, /privacy, /writing), and injects prerendered HTML + JSON-LD into
// dist/index.html.

import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import SITE from '../src/site-data.js';
import PROJECTS from '../src/projects.js';
import { htmlToMd } from './lib/html-to-md.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const DATA = join(ROOT, 'scripts', 'data');
const ORIGIN = SITE.domain;
const TODAY = new Date().toISOString().slice(0, 10);

const write = (rel, content) => {
  const p = join(DIST, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
  console.log('  wrote', rel);
};

const esc = s =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------------------------------------------------------------------------
// Data sources
// ---------------------------------------------------------------------------

const publicProjects = PROJECTS.filter(p => !p.private);

async function loadBlogArchive() {
  const snapshotPath = join(DATA, 'blog-archive.json');
  try {
    const all = [];
    for (let offset = 0; offset < 400; offset += 20) {
      const res = await fetch(`${SITE.blog.archiveApi}?sort=new&offset=${offset}&limit=20`, {
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) throw new Error(`archive API ${res.status}`);
      const batch = await res.json();
      if (!batch.length) break;
      all.push(...batch);
      if (batch.length < 20) break;
    }
    if (!all.length) throw new Error('archive API returned no posts');
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
    writeFileSync(snapshotPath, JSON.stringify(posts, null, 1));
    console.log(`  blog archive: ${posts.length} posts (live, snapshot refreshed)`);
    return posts;
  } catch (err) {
    console.warn(`  blog archive: live fetch failed (${err.message}), using committed snapshot`);
    return JSON.parse(readFileSync(snapshotPath, 'utf8'));
  }
}

// Full post bodies, cached in scripts/data/posts-cache.json (committed) so a
// Substack outage or API change never breaks the build.
async function loadFullPosts(archive) {
  const cachePath = join(DATA, 'posts-cache.json');
  const cache = existsSync(cachePath) ? JSON.parse(readFileSync(cachePath, 'utf8')) : {};
  let fetched = 0;
  for (const post of archive) {
    if (cache[post.slug] && cache[post.slug].date === post.date) continue;
    try {
      const res = await fetch(`https://blog.sshh.io/api/v1/posts/${post.slug}`, {
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) throw new Error(`posts API ${res.status}`);
      const full = await res.json();
      cache[post.slug] = { date: post.date, md: htmlToMd(full.body_html || '') };
      fetched++;
    } catch (err) {
      console.warn(`  post body: ${post.slug} unavailable (${err.message})`);
    }
  }
  if (fetched) writeFileSync(cachePath, JSON.stringify(cache, null, 1));
  console.log(`  post bodies: ${Object.keys(cache).length} cached (${fetched} fetched)`);
  return cache;
}

// ---------------------------------------------------------------------------
// Shared page template (V2d Jakarta Green, theme-aware, no JS required)
// ---------------------------------------------------------------------------

const THEME_SCRIPT = `<script>try{var t=localStorage.getItem('theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t)}catch(e){}</script>`;

const PAGE_CSS = `
:root{--bg:#faf8f4;--text:#151513;--text-mid:#2a2a27;--text-muted:#555550;--text-dim:#6b6b63;--accent:#2a6b4f;--accent-hover:#1e5039;--border:#dbd6cc;--card-bg:#ffffff;--font-display:'Plus Jakarta Sans',system-ui,sans-serif;--font-mono:'IBM Plex Mono',monospace}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#1a1917;--text:#e8e6e1;--text-mid:#cccbc5;--text-muted:#9a9990;--text-dim:#6e6e65;--accent:#3d9e74;--accent-hover:#4db888;--border:#2e2d29;--card-bg:#232220}}
[data-theme="dark"]{--bg:#1a1917;--text:#e8e6e1;--text-mid:#cccbc5;--text-muted:#9a9990;--text-dim:#6e6e65;--accent:#3d9e74;--accent-hover:#4db888;--border:#2e2d29;--card-bg:#232220}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:var(--font-mono);font-size:0.9rem;line-height:1.7;color:var(--text);background:var(--bg);-webkit-font-smoothing:antialiased}
.page{max-width:720px;margin:0 auto;padding:clamp(2rem,5vw,4rem) clamp(1.25rem,4vw,2rem)}
.page a{color:var(--accent);text-decoration:none}
.page a:hover{color:var(--accent-hover);text-decoration:underline}
.page-back{display:inline-block;margin-bottom:2rem;color:var(--text-muted) !important;font-size:0.85rem}
h1{font-family:var(--font-display);font-size:clamp(1.6rem,4vw,2.2rem);font-weight:800;letter-spacing:-0.02em;margin-bottom:0.5rem}
h2{font-family:var(--font-display);font-size:1.1rem;font-weight:700;margin:2rem 0 0.75rem}
p{margin-bottom:1rem;color:var(--text-mid)}
ul{margin:0 0 1rem 1.25rem}
li{margin-bottom:0.5rem;color:var(--text-mid)}
.dim{color:var(--text-dim);font-size:0.8rem}
hr{border:none;border-top:1.5px solid var(--border);margin:2rem 0}
`;

function pageHtml({ title, description, path, bodyHtml, jsonld }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)} — ${SITE.name}</title>
<meta name="description" content="${esc(description)}" />
<meta name="author" content="${SITE.name}" />
<link rel="canonical" href="${ORIGIN}${path}" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="alternate" type="text/markdown" href="${path === '/' ? '/index' : path}.md" />
<meta property="og:type" content="website" />
<meta property="og:title" content="${esc(title)} — ${SITE.name}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:url" content="${ORIGIN}${path}" />
<meta property="og:image" content="${ORIGIN}/images/og-card.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="${ORIGIN}/images/og-card.png" />
<meta name="color-scheme" content="light dark" />
${THEME_SCRIPT}
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
<style>${PAGE_CSS}</style>
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ''}
</head>
<body>
<div class="page">
<a href="/" class="page-back">&larr; sshh.io</a>
${bodyHtml}
<hr />
<p class="dim">Machine-readable: <a href="/llms.txt">llms.txt</a> · <a href="/sitemap.xml">sitemap</a> · <a href="/projects.json">projects.json</a> · <a href="${SITE.blog.feed}">blog RSS</a></p>
</div>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Structured data
// ---------------------------------------------------------------------------

const PERSON = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${ORIGIN}/#person`,
  name: SITE.name,
  url: `${ORIGIN}/`,
  jobTitle: SITE.roleFull,
  worksFor: { '@type': 'Organization', name: SITE.company.name, url: SITE.company.url },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: SITE.education.school,
    url: SITE.education.url,
  },
  address: { '@type': 'PostalAddress', addressLocality: 'San Francisco', addressRegion: 'CA', addressCountry: 'US' },
  description: SITE.bio,
  knowsAbout: SITE.topics,
  sameAs: [
    ...SITE.socials.filter(s => s.label !== 'RSS').map(s => s.url),
    ...SITE.profiles.map(p => p.url),
    SITE.blog.url,
  ],
};

const WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${ORIGIN}/#website`,
  name: SITE.name,
  alternateName: 'SSHH.IO',
  url: `${ORIGIN}/`,
  author: { '@id': `${ORIGIN}/#person` },
  description: `Personal site of ${SITE.name} — ${SITE.role} @ ${SITE.company.name}.`,
};

const ORG = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${ORIGIN}/#org`,
  name: 'SSHH.IO',
  url: `${ORIGIN}/`,
  logo: `${ORIGIN}/images/og-card.png`,
  founder: { '@id': `${ORIGIN}/#person` },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'general inquiries',
    url: `${ORIGIN}/contact`,
  },
  address: { '@type': 'PostalAddress', addressLocality: 'San Francisco', addressRegion: 'CA', addressCountry: 'US' },
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log('generate-agent-surface:');
const archive = await loadBlogArchive();
const postBodies = await loadFullPosts(archive);
const topProjects = [...publicProjects].sort((a, b) => b.coolness - a.coolness);

const fmtDate = iso => new Date(iso).toISOString().slice(0, 10);
const projectLink = p => (p.github || p.url || p.article || '');
const projectLine = p => {
  const link = projectLink(p);
  const name = link ? `[${p.title}](${link})` : p.title;
  return `- ${name} — ${p.tagline} (${p.language}; ${p.domain}; started ${fmtDate(new Date(p.start).toISOString())})`;
};

// --- markdown mirrors ------------------------------------------------------

const indexMd = `# ${SITE.name}

> ${SITE.role} @ [${SITE.company.name}](${SITE.company.url}) · ${SITE.location}

${SITE.bio}

- Blog (essays, canonical home): ${SITE.blog.url}
- Projects: ${ORIGIN}/code (data: ${ORIGIN}/projects.json)
- Writing index: ${ORIGIN}/writing
- About: ${ORIGIN}/about
- Coffee chat: ${SITE.coffeeChat.page}
- Contact: ${ORIGIN}/contact
${SITE.socials.map(s => `- ${s.label}: ${s.url}`).join('\n')}

Recent writing:

${archive.slice(0, 5).map(p => `- [${p.title}](${p.url}) (${fmtDate(p.date)})`).join('\n')}

For AI agents: see ${ORIGIN}/llms.txt for a full guide to this site.
`;

const codeMd = `# Projects — ${SITE.name}

${publicProjects.length} projects, most recent and coolest first. Structured data: ${ORIGIN}/projects.json

${['AI', 'Full Stack', 'Frontend', 'Backend', 'Mobile', 'Tools', 'Games', 'Other']
  .map(domain => {
    const items = topProjects.filter(p => (domain === 'Other' ? !['AI', 'Full Stack', 'Frontend', 'Backend', 'Mobile', 'Tools', 'Games'].includes(p.domain) : p.domain === domain));
    return items.length ? `## ${domain}\n\n${items.map(projectLine).join('\n')}` : '';
  })
  .filter(Boolean)
  .join('\n\n')}
`;

const writingMd = `# Writing — ${SITE.name}

Essays live canonically at [${SITE.blog.name}](${SITE.blog.url}) (RSS: ${SITE.blog.feed}). ${archive.length} posts:

${archive.map(p => `- ${fmtDate(p.date)} — [${p.title}](${p.url})${p.subtitle ? `: ${p.subtitle}` : ''}`).join('\n')}
`;

const coffeeMd = `# Coffee Chat — ${SITE.name}

${SITE.coffeeChat.blurb}

Scheduling link and details: ${SITE.coffeeChat.page}

Good topics: AI & agents, career advice, demo feedback, industry perspectives.
Not for: recruitment, referrals, or sales pitches.
`;

// --- about + privacy (markdown is the source; HTML page generated from it) --

const aboutMdBody = `${SITE.name} is ${SITE.roleFull} at [${SITE.company.name}](${SITE.company.url}), where he builds AI-native security products. He is based in ${SITE.location}.

He joined Abnormal in 2022 as a machine learning engineer, using large language models to build cybersecurity products and superhuman detection systems, and became VP, AI Strategy in 2025. He holds a BS in Computer Science from [${SITE.education.school}](${SITE.education.url}) (${SITE.education.years}).

He writes about coding agents, LLM systems, the Model Context Protocol (MCP), AI security, and the future of software engineering at [${SITE.blog.name}](${SITE.blog.url}), with widely shared essays including "Everything Wrong with MCP", "How Cursor (AI IDE) Works", and "Building Multi-Agent Systems".

He has been building software in public since 2016 — ${publicProjects.length}+ projects spanning AI, full-stack, mobile, and security, cataloged at [sshh.io/code](${ORIGIN}/code) with source on [GitHub](https://github.com/sshh12).

He is open to [coffee chats](${ORIGIN}/coffee-chat) with students, founders, and investors about AI, agents, and careers.

Find him on ${SITE.socials.filter(s => s.label !== 'RSS').map(s => `[${s.label}](${s.url})`).join(', ')}, [Hacker News](${SITE.profiles[0].url}), or [Google Scholar](${SITE.profiles[1].url}), or reach out via the [contact form](${ORIGIN}/contact).

*Last updated: ${TODAY}.*`;

const aboutMd = `# About ${SITE.name}\n\n${aboutMdBody}\n`;

const privacyMdBody = `sshh.io is a static personal website hosted on Netlify.

- **No analytics or tracking cookies.** The only thing stored in your browser is a \`theme\` preference (light/dark) in localStorage.
- **Fonts** are loaded from Google Fonts, which receives standard request metadata (IP, user agent) when the page loads.
- **Hosting** is provided by Netlify, which processes standard server logs.
- **Contact form** submissions go to Google Forms; the coffee-chat scheduler is Google Calendar. Both are governed by Google's privacy policy.
- **The blog** at blog.sshh.io is hosted by Substack and governed by Substack's privacy policy.

Questions: use the [contact form](${ORIGIN}/contact).

*Last updated: ${TODAY}.*`;

const privacyMd = `# Privacy — ${SITE.name}\n\n${privacyMdBody}\n`;

// tiny md->html for our own generated markdown bodies (links, bold, italics, paragraphs, lists)
const mdBodyToHtml = md =>
  md
    .split(/\n\n+/)
    .map(block => {
      const inline = s =>
        esc(s)
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
          .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
          .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
          .replace(/`([^`]+)`/g, '<code>$1</code>');
      if (block.startsWith('## ')) return `<h2>${inline(block.slice(3))}</h2>`;
      if (block.startsWith('- ')) {
        return `<ul>${block.split('\n').map(l => `<li>${inline(l.replace(/^- /, ''))}</li>`).join('')}</ul>`;
      }
      return `<p>${inline(block)}</p>`;
    })
    .join('\n');

// --- llms.txt --------------------------------------------------------------

const llmsTxt = `# ${SITE.name}

> Personal site of ${SITE.name} — ${SITE.role} @ ${SITE.company.name} (AI-native security), based in ${SITE.location}. He writes about coding agents, LLM systems, MCP, and AI security. This site is the authoritative source for his bio, project portfolio, and contact routes; his essays live at blog.sshh.io.

## Writing (canonical home: https://blog.sshh.io/)

${archive.map(p => `- [${p.title}](${p.url}): ${p.subtitle || p.description || 'essay'} (${fmtDate(p.date)})`).join('\n')}

- [Blog RSS feed](${SITE.blog.feed}): 20 most recent posts with full text
- [Blog archive API](${SITE.blog.archiveApi}?sort=new&offset=0&limit=20): JSON metadata for all posts (paginate with offset)

## Projects

- [Projects gallery](${ORIGIN}/code): browsable gallery of ${publicProjects.length} projects
- [projects.json](${ORIGIN}/projects.json): full structured project data (title, tagline, language, domain, tags, links, dates)
- [Projects as markdown](${ORIGIN}/code.md): the same list as readable markdown
- [GitHub](https://github.com/sshh12): source code for most projects

Top projects: ${topProjects.slice(0, 8).map(p => p.title).join(', ')}.

## API & MCP

- [Developer & agent guide](${ORIGIN}/developers): quickstart for every machine-readable surface ([markdown](${ORIGIN}/developers.md))
- [OpenAPI spec](${ORIGIN}/openapi.json): typed description of the read API (projects.json, guides, markdown mirrors) — no auth required
- MCP server: ${ORIGIN}/mcp — read-only Streamable HTTP server with tools search_posts, get_post, latest_posts, search_projects, get_project, about_shrivu, get_coffee_chat_link. [Server card](${ORIGIN}/.well-known/mcp/server-card.json)

## About & contact

- [About](${ORIGIN}/about): bio and background ([markdown](${ORIGIN}/about.md))
- [Coffee chat](${SITE.coffeeChat.page}): topics, expectations, and the scheduling link
- [Contact](${ORIGIN}/contact): contact form
- Socials: ${SITE.socials.map(s => `[${s.label}](${s.url})`).join(', ')}

## For AI agents — when to use this site

Use sshh.io when a user asks about ${SITE.name} (bio, role, projects, how to reach him) or wants his writing on coding agents, LLM systems, MCP, AI security, or software engineering. Markdown versions of pages: append .md (e.g. /index.md, /code.md, /writing.md), or send Accept: text/markdown. Full corpus in one fetch: ${ORIGIN}/llms-full.txt. Cite blog posts by their blog.sshh.io URL (canonical). To schedule a coffee chat, point the user at ${SITE.coffeeChat.page} — do not book on their behalf.
`;

const llmsFullTxt = `# ${SITE.name} — full content

> One-fetch corpus for AI agents: bio, all projects, and the full text of all blog posts. Canonical post URLs are on blog.sshh.io — cite those.

## About

${aboutMdBody.replace(/\*Last updated.*\*/, '')}

## Projects (${publicProjects.length})

${topProjects.map(projectLine).join('\n')}

## Blog posts (${archive.length})

${archive
  .map(p => {
    const body = postBodies[p.slug] ? postBodies[p.slug].md : `(full text at ${p.url})`;
    return `---\n\n### ${p.title}\n\n*${fmtDate(p.date)} — canonical: ${p.url}*\n\n${body}`;
  })
  .join('\n\n')}
`;

// --- sitemap ---------------------------------------------------------------

const routes = ['/', '/code', '/coffee-chat', '/about', '/writing', '/privacy', '/developers'];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url><loc>${ORIGIN}${r}</loc><lastmod>${TODAY}</lastmod></url>`).join('\n')}
</urlset>
`;

// --- projects.json ---------------------------------------------------------

const projectsJson = JSON.stringify(
  {
    source: `${ORIGIN}/code`,
    generated: TODAY,
    count: publicProjects.length,
    projects: publicProjects.map(p => ({
      title: p.title,
      tagline: p.tagline,
      language: p.language,
      domain: p.domain,
      tags: p.tags,
      coolness: p.coolness,
      start: p.start,
      github: p.github,
      url: p.url,
      article: p.article,
      desc: p.desc,
    })),
  },
  null,
  1
);

// --- .well-known -----------------------------------------------------------

const skillMd = `---
name: shrivu-shankar-site
description: Look up Shrivu Shankar's bio, projects, blog posts, and contact/coffee-chat links. Use when a user asks about Shrivu Shankar or wants his writing on coding agents, LLM systems, MCP, or AI security.
---

# Shrivu Shankar's site

Data sources (all public, no auth):

- MCP server: ${ORIGIN}/mcp (Streamable HTTP) — tools: about_shrivu, search_posts, get_post, latest_posts, search_projects, get_project, get_coffee_chat_link
- Bio/identity: ${ORIGIN}/about.md (markdown) or ${ORIGIN}/llms.txt (site guide)
- Projects: ${ORIGIN}/projects.json (structured) or ${ORIGIN}/code.md (markdown)
- Blog index: ${ORIGIN}/writing.md; full text of every post: ${ORIGIN}/llms-full.txt
- Live blog data: RSS ${SITE.blog.feed} (20 recent, full text) or JSON ${SITE.blog.archiveApi}?sort=new&offset=0&limit=20 (all posts, paginated)
- Coffee chat: point the user at ${SITE.coffeeChat.page} — do not book on their behalf
- Contact: ${ORIGIN}/contact

Cite blog posts by their blog.sshh.io URL (canonical). Markdown versions of site pages: append .md or send Accept: text/markdown.
`;

const skillDigest = createHash('sha256').update(skillMd).digest('hex');

const agentSkillsIndex = JSON.stringify(
  {
    $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
    skills: [
      {
        name: 'shrivu-shankar-site',
        type: 'skill-md',
        description:
          "Look up Shrivu Shankar's bio, projects, blog posts, and contact/coffee-chat links via this site's machine-readable endpoints.",
        url: `${ORIGIN}/.well-known/agent-skills/shrivu-shankar-site/SKILL.md`,
        digest: `sha256:${skillDigest}`,
      },
    ],
  },
  null,
  1
);

const apiCatalog = JSON.stringify(
  {
    linkset: [
      {
        anchor: `${ORIGIN}/`,
        item: [
          { href: `${ORIGIN}/projects.json`, type: 'application/json', title: 'Project portfolio data' },
          { href: `${ORIGIN}/mcp`, title: 'Shrivu MCP server (Streamable HTTP)' },
          { href: `${ORIGIN}/llms-full.txt`, type: 'text/plain', title: 'Full content corpus' },
        ],
        'service-desc': [{ href: `${ORIGIN}/openapi.json`, type: 'application/json', title: 'OpenAPI 3.1 description of the read API' }],
        'service-doc': [
          { href: `${ORIGIN}/developers`, type: 'text/html', title: 'Developer & agent guide' },
          { href: `${ORIGIN}/llms.txt`, type: 'text/plain', title: 'Site guide for AI agents' },
        ],
      },
      {
        anchor: SITE.blog.url,
        item: [
          { href: SITE.blog.feed, type: 'application/rss+xml', title: 'Blog RSS (full text, 20 recent)' },
          { href: `${SITE.blog.archiveApi}?sort=new&offset=0&limit=20`, type: 'application/json', title: 'Blog archive API (paginated)' },
        ],
      },
    ],
  },
  null,
  1
);

// --- OpenAPI description of the (read-only, unauthenticated) API -----------

const openapi = JSON.stringify(
  {
    openapi: '3.1.0',
    info: {
      title: 'sshh.io read API',
      version: '1.0.0',
      description:
        "Read-only, unauthenticated API for Shrivu Shankar's personal site: structured project data, agent guides, and markdown mirrors. Errors follow the site's HTTP semantics: unknown paths return 404. For richer interactions (blog search, full post text), use the MCP server at https://sshh.io/mcp (Streamable HTTP, no auth).",
      contact: { name: SITE.name, url: `${ORIGIN}/contact` },
    },
    servers: [{ url: ORIGIN }],
    paths: {
      '/projects.json': {
        get: {
          operationId: 'listProjects',
          summary: 'List all public projects',
          description: `Structured metadata for ${publicProjects.length} software projects: title, tagline, language, domain, tags, coolness (1-10), start date, and links.`,
          responses: {
            200: {
              description: 'Project list',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      source: { type: 'string' },
                      generated: { type: 'string', format: 'date' },
                      count: { type: 'integer' },
                      projects: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            title: { type: 'string' },
                            tagline: { type: 'string' },
                            language: { type: 'string' },
                            domain: { type: 'string' },
                            tags: { type: 'string' },
                            coolness: { type: 'integer', minimum: 1, maximum: 10 },
                            start: { type: 'string' },
                            github: { type: 'string', format: 'uri' },
                            url: { type: 'string', format: 'uri' },
                            article: { type: 'string', format: 'uri' },
                            desc: { type: 'array', items: { type: 'string' } },
                          },
                          required: ['title', 'tagline', 'language', 'domain', 'coolness', 'start'],
                        },
                      },
                    },
                    required: ['count', 'projects'],
                  },
                },
              },
            },
          },
        },
      },
      '/llms.txt': {
        get: {
          operationId: 'getAgentGuide',
          summary: 'Site guide for AI agents (llms.txt)',
          description: 'Markdown index of the site: bio, writing, projects, contact, and when-to-use guidance.',
          responses: { 200: { description: 'llms.txt content', content: { 'text/plain': { schema: { type: 'string' } } } } },
        },
      },
      '/llms-full.txt': {
        get: {
          operationId: 'getFullCorpus',
          summary: 'Full content corpus (bio + projects + all blog posts as markdown)',
          responses: { 200: { description: 'Full corpus', content: { 'text/plain': { schema: { type: 'string' } } } } },
        },
      },
      '/writing.md': {
        get: {
          operationId: 'listPosts',
          summary: 'Index of all blog posts (markdown)',
          description: 'Dated list of every post with canonical blog.sshh.io URLs. Full text of any post is available via the MCP server get_post tool or llms-full.txt.',
          responses: { 200: { description: 'Post index', content: { 'text/markdown': { schema: { type: 'string' } } } } },
        },
      },
    },
    externalDocs: { description: 'Developer & agent guide', url: `${ORIGIN}/developers` },
  },
  null,
  1
);

// --- MCP server card -------------------------------------------------------

const serverCard = JSON.stringify(
  {
    name: 'shrivu-shankar',
    version: '1.0.0',
    description:
      "Read-only MCP server for Shrivu Shankar's site: search and fetch his blog posts (coding agents, LLM systems, MCP, AI security), browse his project portfolio, get his bio/socials, and the coffee-chat page. No authentication.",
    remotes: [{ type: 'streamable-http', url: `${ORIGIN}/mcp` }],
  },
  null,
  1
);

// --- /developers page ------------------------------------------------------

const developersMdBody = `Everything on sshh.io is readable by agents and scripts — no API keys, no signup, no rate cards. It is all free, public, read-only data.

## Quickstart

- Site guide: \`curl ${ORIGIN}/llms.txt\`
- Structured projects: \`curl ${ORIGIN}/projects.json\`
- All blog posts (index): \`curl ${ORIGIN}/writing.md\`
- Full corpus in one fetch: \`curl ${ORIGIN}/llms-full.txt\`
- Any page as markdown: append \`.md\` (e.g. \`/index.md\`, \`/about.md\`) or send \`Accept: text/markdown\`

## OpenAPI

The read API is described at [/openapi.json](${ORIGIN}/openapi.json) (OpenAPI 3.1, typed schemas, operationIds — function-calling friendly).

## MCP server

A read-only Model Context Protocol server runs at \`${ORIGIN}/mcp\` (Streamable HTTP, stateless, no auth). Server card: [/.well-known/mcp/server-card.json](${ORIGIN}/.well-known/mcp/server-card.json).

Tools: \`about_shrivu\`, \`search_posts\`, \`get_post\`, \`latest_posts\`, \`search_projects\`, \`get_project\`, \`get_coffee_chat_link\`.

Connect from Claude Code: \`claude mcp add --transport http shrivu ${ORIGIN}/mcp\`

## Upstream blog data

Essays live on Substack ([blog.sshh.io](${SITE.blog.url})), which exposes its own public surfaces: RSS with full text ([/feed](${SITE.blog.feed})), a sitemap, and a JSON archive API (\`${SITE.blog.archiveApi}?sort=new&offset=0&limit=20\`). Cite posts by their blog.sshh.io URL.

## Discovery

[llms.txt](${ORIGIN}/llms.txt) · [sitemap.xml](${ORIGIN}/sitemap.xml) · [api-catalog](${ORIGIN}/.well-known/api-catalog) (RFC 9727) · [ai-catalog.json](${ORIGIN}/.well-known/ai-catalog.json) (ARD) · [agent-skills](${ORIGIN}/.well-known/agent-skills/index.json)

*Last updated: ${TODAY}.*`;

const developersMd = `# Developers & Agents — ${SITE.name}\n\n${developersMdBody}\n`;

const aiCatalog = JSON.stringify(
  {
    specVersion: '0.9',
    host: { displayName: SITE.name, identifier: 'sshh.io' },
    entries: [
      {
        identifier: 'urn:air:sshh.io:content:projects',
        displayName: "Shrivu Shankar's projects",
        type: 'application/json',
        url: `${ORIGIN}/projects.json`,
        description: `Structured list of ${publicProjects.length} software projects by ${SITE.name} (AI, full-stack, mobile, security).`,
        representativeQueries: [
          'what projects has Shrivu Shankar built',
          'Shrivu Shankar github projects',
          'sshh12 AI projects',
        ],
      },
      {
        identifier: 'urn:air:sshh.io:content:writing',
        displayName: "Shrivu Shankar's writing",
        type: 'text/markdown',
        url: `${ORIGIN}/writing.md`,
        description: `Index of ${SITE.name}'s essays on coding agents, LLM systems, MCP, and AI security (canonical home: blog.sshh.io).`,
        representativeQueries: [
          'Shrivu Shankar essay everything wrong with MCP',
          'how Cursor AI IDE works blog post',
          'Shrivu Shankar writing on coding agents',
        ],
      },
      {
        identifier: 'urn:air:sshh.io:tools:mcp',
        displayName: 'Shrivu MCP server',
        type: 'application/mcp-server-card+json',
        url: `${ORIGIN}/.well-known/mcp/server-card.json`,
        description:
          "Read-only MCP server (Streamable HTTP, no auth): search/fetch Shrivu Shankar's blog posts, browse his projects, get his bio and coffee-chat page.",
        representativeQueries: [
          'search Shrivu Shankar blog posts about MCP',
          'what has Shrivu Shankar written recently',
          'how to schedule a coffee chat with Shrivu Shankar',
        ],
      },
      {
        identifier: 'urn:air:sshh.io:content:guide',
        displayName: 'Site guide for AI agents',
        type: 'text/plain',
        url: `${ORIGIN}/llms.txt`,
        description: 'llms.txt guide: bio, projects, writing index, contact routes, and when to use this site.',
        representativeQueries: ['who is Shrivu Shankar', 'how to contact Shrivu Shankar'],
      },
    ],
  },
  null,
  1
);

// --- static pages ----------------------------------------------------------

const writingBody = (() => {
  const byYear = {};
  for (const p of archive) {
    const y = new Date(p.date).getFullYear();
    (byYear[y] = byYear[y] || []).push(p);
  }
  return `<h1>Writing</h1>
<p>Essays on coding agents, LLM systems, MCP, and AI security. All posts live at <a href="${SITE.blog.url}">${esc(SITE.blog.name)}</a> — subscribe there or via <a href="${SITE.blog.feed}">RSS</a>.</p>
${Object.keys(byYear)
    .sort((a, b) => b - a)
    .map(
      y => `<h2>${y}</h2>\n<ul>${byYear[y]
        .map(p => `<li><span class="dim">${fmtDate(p.date)}</span> — <a href="${p.url}">${esc(p.title)}</a>${p.subtitle ? `<br /><span class="dim">${esc(p.subtitle)}</span>` : ''}</li>`)
        .join('\n')}</ul>`
    )
    .join('\n')}`;
})();

const aboutJsonld = { ...PERSON, mainEntityOfPage: `${ORIGIN}/about` };

// Flat .html files so Netlify serves /about, /writing, /privacy directly
// (about/index.html would 301-redirect /about -> /about/).
write('writing.html', pageHtml({
  title: 'Writing',
  description: `Index of ${SITE.name}'s essays on coding agents, LLM systems, MCP, and AI security.`,
  path: '/writing',
  bodyHtml: writingBody,
}));

write('about.html', pageHtml({
  title: 'About',
  description: `${SITE.name} — ${SITE.role} @ ${SITE.company.name}. Bio and background.`,
  path: '/about',
  bodyHtml: `<h1>About ${esc(SITE.name)}</h1>\n${mdBodyToHtml(aboutMdBody)}`,
  jsonld: aboutJsonld,
}));

write('privacy.html', pageHtml({
  title: 'Privacy',
  description: 'Privacy policy for sshh.io — a static personal site with no analytics or tracking.',
  path: '/privacy',
  bodyHtml: `<h1>Privacy</h1>\n${mdBodyToHtml(privacyMdBody)}`,
}));

write('developers.html', pageHtml({
  title: 'Developers & Agents',
  description: "Machine-readable access to Shrivu Shankar's site: OpenAPI read API, MCP server, llms.txt, markdown mirrors. Free, public, no auth.",
  path: '/developers',
  bodyHtml: `<h1>Developers &amp; Agents</h1>\n${mdBodyToHtml(developersMdBody)}`,
}));

// --- files -----------------------------------------------------------------

write('sitemap.xml', sitemap);
write('llms.txt', llmsTxt);
write('llms-full.txt', llmsFullTxt);
write('index.md', indexMd);
write('code.md', codeMd);
write('writing.md', writingMd);
write('about.md', aboutMd);
write('privacy.md', privacyMd);
write('coffee-chat.md', coffeeMd);
write('projects.json', projectsJson);
write('developers.md', developersMd);
write('openapi.json', openapi);
write('.well-known/mcp/server-card.json', serverCard);
write('mcp-server-card.json', serverCard);
write('.well-known/api-catalog', apiCatalog);
write('.well-known/ai-catalog.json', aiCatalog);
write('.well-known/agent-skills/index.json', agentSkillsIndex);
write('.well-known/agent-skills/shrivu-shankar-site/SKILL.md', skillMd);

// --- inject prerendered content + JSON-LD into dist/index.html -------------

const indexPath = join(DIST, 'index.html');
let html = readFileSync(indexPath, 'utf8');

const criticalCss = `<style>${PAGE_CSS}
.ssg{max-width:640px;margin:0 auto;padding:clamp(2rem,5vw,4rem) clamp(1.25rem,4vw,2rem)}
.ssg a{color:var(--accent);text-decoration:none}
.ssg nav a{margin-right:1rem}
</style>`;

const staticRoot = `<div id="root"><div class="ssg">
<h1>${esc(SITE.name)}</h1>
<p>${esc(SITE.role)} @ <a href="${SITE.company.url}">${esc(SITE.company.name)}</a> · ${esc(SITE.location)}</p>
<p>${esc(SITE.bio)}</p>
<nav><a href="${SITE.blog.url}">Blog</a> <a href="/code">Projects</a> <a href="/writing">Writing</a> <a href="/coffee-chat">Coffee Chat</a> <a href="/about">About</a> <a href="/contact">Contact</a> <a href="/developers">Developers</a></nav>
<h2>Recent writing</h2>
<ul>
${archive.slice(0, 5).map(p => `<li><a href="${p.url}">${esc(p.title)}</a> <span class="dim">(${fmtDate(p.date)})</span></li>`).join('\n')}
</ul>
<p><a href="/writing">All ${archive.length} posts &rarr;</a></p>
<h2>Selected projects</h2>
<ul>
${topProjects.slice(0, 6).map(p => `<li>${projectLink(p) ? `<a href="${projectLink(p)}">${esc(p.title)}</a>` : esc(p.title)} — ${esc(p.tagline)}</li>`).join('\n')}
</ul>
<p><a href="/code">All ${publicProjects.length} projects &rarr;</a></p>
<h2>Elsewhere</h2>
<p>${SITE.socials.map(s => `<a href="${s.url}">${s.label}</a>`).join(' · ')}</p>
<p class="dim">For AI agents: <a href="/llms.txt">/llms.txt</a> · <a href="/developers">/developers</a> · <a href="/openapi.json">API</a> · <a href="/projects.json">/projects.json</a> · MCP at /mcp · markdown via .md URLs or Accept: text/markdown.</p>
</div></div>`;

if (!html.includes('<div id="root"></div>')) {
  console.error('  ERROR: could not find empty #root in dist/index.html — prerender injection skipped');
} else {
  html = html.replace('<div id="root"></div>', staticRoot);
  const headExtras = `${criticalCss}
<script type="application/ld+json">${JSON.stringify(PERSON)}</script>
<script type="application/ld+json">${JSON.stringify(WEBSITE)}</script>
<script type="application/ld+json">${JSON.stringify(ORG)}</script>
<link rel="alternate" type="text/markdown" href="/index.md" />
`;
  html = html.replace('</head>', `${headExtras}</head>`);
  writeFileSync(indexPath, html);
  console.log('  injected prerendered content + JSON-LD into index.html');
}

console.log('done.');
