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
.dim{color:var(--text-muted);font-size:0.8rem}
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

// Re-emit the snapshots as a literal JS module so the MCP Netlify Function can
// import them (esbuild inlines this at bundle time; plain Node imports it too).
writeFileSync(
  join(DATA, 'snapshots.mjs'),
  `// GENERATED by generate-agent-surface.mjs — do not edit by hand.\nexport const SNAPSHOT_ARCHIVE = ${JSON.stringify(archive)};\nexport const SNAPSHOT_POSTS = ${JSON.stringify(postBodies)};\n`
);
console.log('  refreshed scripts/data/snapshots.mjs');
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

He writes about coding agents, LLM systems, the Model Context Protocol (MCP), AI security, AI-driven organizational transformation, and the future of software engineering at [${SITE.blog.name}](${SITE.blog.url}), with widely shared essays including "Everything Wrong with MCP", "How Cursor (AI IDE) Works", and "Building Multi-Agent Systems".

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

const contactMdBody = `The best ways to reach ${SITE.name}, roughly in order of how quickly he'll see it:

- **Contact form** — the reliable route for anything: questions, speaking/podcast invitations, feedback on his writing, or anything else. [Open the contact form](${SITE.contactForm}) (a short Google Form; include links and context so he can respond usefully).
- **Coffee chat** — for a real conversation about AI, agents, careers, or startup ideas, [schedule a coffee chat](${ORIGIN}/coffee-chat) (virtual, or in person in San Francisco). See that page for good topics and what it isn't for.
- **Social** — ${SITE.socials.filter(s => s.label !== 'RSS').map(s => `[${s.label}](${s.url})`).join(', ')}. DMs and mentions work, with more variance in response time.

He reads everything that comes through the form, though replies can take a little while. For anything about his essays, the comments on the relevant [blog post](${SITE.blog.url}) are also a great place — he responds there too.

*No email address is published here on purpose; the form goes to the same place. Last updated: ${TODAY}.*`;

const contactMd = `# Contact — ${SITE.name}\n\n${contactMdBody}\n`;

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
- [OpenAPI spec](${ORIGIN}/openapi.json): typed description of the versioned read API (/api/v1/projects.json, /api/v1/posts.json) — free, no auth, no keys
- MCP server: ${ORIGIN}/mcp — read-only Streamable HTTP server with tools search_posts, get_post, latest_posts, search_projects, get_project, about_shrivu, get_coffee_chat_link. [Server card](${ORIGIN}/.well-known/mcp/server-card.json)

## About & contact

- [About](${ORIGIN}/about): bio and background ([markdown](${ORIGIN}/about.md))
- [Coffee chat](${SITE.coffeeChat.page}): topics, expectations, and the scheduling link
- [Contact](${ORIGIN}/contact): contact form
- Socials: ${SITE.socials.map(s => `[${s.label}](${s.url})`).join(', ')}

## For AI agents — when to use this site

Use sshh.io when a user asks about ${SITE.name} (bio, role, projects, how to reach him) or wants his writing on coding agents, LLM systems, MCP, AI security, AI transformation, or software engineering. Markdown versions of pages: append .md (e.g. /index.md, /code.md, /writing.md), or send Accept: text/markdown. Full corpus in one fetch: ${ORIGIN}/llms-full.txt. Cite blog posts by their blog.sshh.io URL (canonical). To schedule a coffee chat, point the user at ${SITE.coffeeChat.page} — do not book on their behalf.
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

const routes = ['/', '/code', '/coffee-chat', '/about', '/writing', '/privacy', '/developers', '/contact'];
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
description: Look up Shrivu Shankar's bio, projects, blog posts, and contact/coffee-chat links. Use when a user asks about Shrivu Shankar or wants his writing on coding agents, LLM systems, MCP, AI security, or AI transformation.
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

const PROBLEM_SCHEMA = {
  type: 'object',
  description: 'RFC 9457 problem details',
  properties: {
    type: { type: 'string', format: 'uri' },
    title: { type: 'string' },
    status: { type: 'integer' },
    detail: { type: 'string' },
    instance: { type: 'string' },
  },
  required: ['title', 'status'],
};

const problem404 = {
  description: 'Not found',
  content: { 'application/problem+json': { schema: { $ref: '#/components/schemas/Problem' } } },
};

const openapi = JSON.stringify(
  {
    openapi: '3.1.0',
    info: {
      title: 'sshh.io read API',
      version: '1.0.0',
      description:
        "Read-only, unauthenticated JSON API for Shrivu Shankar's personal site. Free tier: everything, forever — no API keys, no signup, no sandbox needed (production is safe to explore; all endpoints are read-only). Versioning: the API is versioned in the URL path (/api/v1/); breaking changes will ship as /api/v2/ and v1 responses will carry Sunset and Deprecation headers for at least 90 days before removal. Rate limits: generous CDN-level limits, disclosed via RateLimit-Policy response headers; on 429 honor Retry-After. Errors: unknown paths return HTTP 404 with application/problem+json (RFC 9457) when JSON is requested. For richer interactions (blog search, full post text) use the MCP server at https://sshh.io/mcp (Streamable HTTP, no auth). Markdown mirrors of site pages: append .md or send Accept: text/markdown; agent guide at /llms.txt.",
      contact: { name: SITE.name, url: `${ORIGIN}/contact` },
    },
    servers: [{ url: ORIGIN }],
    paths: {
      '/api/v1/projects.json': {
        get: {
          operationId: 'listProjects',
          summary: 'List all public projects',
          description: `Structured metadata for ${publicProjects.length} software projects: title, tagline, language, domain, tags, coolness (1-10), start date, and links. Also served unversioned at /projects.json.`,
          responses: {
            200: {
              description: 'Project list',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/ProjectList' } } },
            },
            404: problem404,
          },
        },
      },
      '/api/v1/posts.json': {
        get: {
          operationId: 'listPosts',
          summary: 'List all blog posts (metadata + canonical URLs)',
          description:
            'Metadata for every blog post: title, subtitle, date, description, slug, and canonical blog.sshh.io URL. Full post text is available via the MCP get_post tool or /llms-full.txt. Also served unversioned at /posts.json.',
          responses: {
            200: {
              description: 'Post list',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/PostList' } } },
            },
            404: problem404,
          },
        },
      },
    },
    components: {
      schemas: {
        Problem: PROBLEM_SCHEMA,
        Project: {
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
        ProjectList: {
          type: 'object',
          properties: {
            source: { type: 'string', format: 'uri' },
            generated: { type: 'string', format: 'date' },
            count: { type: 'integer' },
            projects: { type: 'array', items: { $ref: '#/components/schemas/Project' } },
          },
          required: ['count', 'projects'],
        },
        Post: {
          type: 'object',
          properties: {
            slug: { type: 'string' },
            title: { type: 'string' },
            subtitle: { type: 'string' },
            date: { type: 'string', format: 'date-time' },
            url: { type: 'string', format: 'uri', description: 'Canonical blog.sshh.io URL — cite this' },
            description: { type: 'string' },
          },
          required: ['slug', 'title', 'date', 'url'],
        },
        PostList: { type: 'array', items: { $ref: '#/components/schemas/Post' } },
      },
    },
    externalDocs: { description: 'Developer & agent portal', url: `${ORIGIN}/developers` },
  },
  null,
  1
);

const openapiMd = `# sshh.io read API

OpenAPI 3.1 spec: ${ORIGIN}/openapi.json — read-only, no auth, no keys, free forever.

- \`GET /api/v1/projects.json\` (listProjects) — ${publicProjects.length} projects with title, tagline, language, domain, tags, coolness, dates, links
- \`GET /api/v1/posts.json\` (listPosts) — all blog posts with canonical blog.sshh.io URLs

Versioning: URL-path (/api/v1/); breaking changes ship as /api/v2/ with Sunset/Deprecation headers on v1 for 90+ days. Rate limits disclosed via RateLimit-Policy headers. Errors: 404 as RFC 9457 application/problem+json when JSON is requested.

Richer access: MCP server at ${ORIGIN}/mcp (Streamable HTTP) · agent guide at ${ORIGIN}/llms.txt · developer portal at ${ORIGIN}/developers
`;

// --- MCP server card -------------------------------------------------------

// Keep this tool manifest in sync with netlify/functions/mcp.mjs.
const MCP_TOOLS = [
  { name: 'about_shrivu', description: "Shrivu Shankar's bio, role, location, links, and socials." },
  { name: 'search_posts', description: 'Search blog posts (coding agents, LLM systems, MCP, AI security, AI transformation) by keyword; returns canonical blog.sshh.io URLs.', inputSchema: { type: 'object', properties: { query: { type: 'string' }, limit: { type: 'integer' } }, required: ['query'] } },
  { name: 'get_post', description: 'Full text of one blog post as markdown, by slug.', inputSchema: { type: 'object', properties: { slug: { type: 'string' } }, required: ['slug'] } },
  { name: 'latest_posts', description: 'Most recent blog posts with summaries.', inputSchema: { type: 'object', properties: { limit: { type: 'integer' } } } },
  { name: 'search_projects', description: `Search ${publicProjects.length} software projects by keyword, language, or domain.`, inputSchema: { type: 'object', properties: { query: { type: 'string' }, limit: { type: 'integer' } }, required: ['query'] } },
  { name: 'get_project', description: 'Full metadata for one project by title.', inputSchema: { type: 'object', properties: { title: { type: 'string' } }, required: ['title'] } },
  { name: 'get_coffee_chat_link', description: 'How to schedule a coffee chat (returns the /coffee-chat page; never books).' },
];

const serverCard = JSON.stringify(
  {
    name: 'shrivu-shankar',
    version: '1.0.0',
    description:
      "Read-only MCP server for Shrivu Shankar's site: search and fetch his blog posts (coding agents, LLM systems, MCP, AI security, AI transformation), browse his project portfolio, get his bio/socials, and the coffee-chat page. No authentication.",
    serverUrl: `${ORIGIN}/mcp`,
    transport: 'streamable-http',
    remotes: [{ type: 'streamable-http', url: `${ORIGIN}/mcp` }],
    authentication: { type: 'none' },
    tools: MCP_TOOLS,
  },
  null,
  1
);

// MCP registry-style metadata (server.json convention)
const serverJson = JSON.stringify(
  {
    name: 'io.sshh/shrivu-shankar',
    description: "Read-only MCP server for Shrivu Shankar's personal site: blog search/fetch, project portfolio, bio, coffee-chat link.",
    version: '1.0.0',
    remotes: [{ type: 'streamable-http', url: `${ORIGIN}/mcp` }],
  },
  null,
  1
);

// --- /developers page ------------------------------------------------------

const developersMdBody = `Everything on sshh.io is readable by agents and scripts. **Free tier: everything, forever** — no API keys, no signup, no sales forms. There is no separate sandbox environment because none is needed: every endpoint is read-only, so production is safe to explore. Self-serve from the first request.

## Quickstart

- Site guide: \`curl ${ORIGIN}/llms.txt\`
- Structured projects: \`curl ${ORIGIN}/projects.json\`
- All blog posts (index): \`curl ${ORIGIN}/writing.md\`
- Full corpus in one fetch: \`curl ${ORIGIN}/llms-full.txt\`
- Any page as markdown: append \`.md\` (e.g. \`/index.md\`, \`/about.md\`) or send \`Accept: text/markdown\`

## OpenAPI

The read API is described at [/openapi.json](${ORIGIN}/openapi.json) (OpenAPI 3.1, typed schemas, operationIds — function-calling friendly). Endpoints are versioned in the URL path:

- \`GET /api/v1/projects.json\` — structured project portfolio
- \`GET /api/v1/posts.json\` — all blog posts with canonical URLs

**Versioning & deprecation:** breaking changes ship as \`/api/v2/\`; v1 responses will carry \`Sunset\` and \`Deprecation\` headers for at least 90 days before removal. **Rate limits:** generous CDN-level limits disclosed via \`RateLimit-Policy\` response headers — honor \`Retry-After\` on a 429. **Errors:** unknown API paths return 404 as RFC 9457 \`application/problem+json\` when JSON is requested.

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
        description: `Index of ${SITE.name}'s essays on coding agents, LLM systems, MCP, AI security, and AI transformation (canonical home: blog.sshh.io).`,
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
<p>Essays on coding agents, LLM systems, MCP, AI security, and AI transformation. All posts live at <a href="${SITE.blog.url}">${esc(SITE.blog.name)}</a> — subscribe there or via <a href="${SITE.blog.feed}">RSS</a>.</p>
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
  description: `Index of ${SITE.name}'s essays on coding agents, LLM systems, MCP, AI security, and AI transformation.`,
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
  title: 'sshh.io Developer Portal',
  description: "sshh.io developer portal — Shrivu Shankar's OpenAPI read API, MCP server, llms.txt, and markdown mirrors. Free, public, no auth, no keys.",
  path: '/developers',
  bodyHtml: `<h1>sshh.io Developer Portal</h1>\n${mdBodyToHtml(developersMdBody)}`,
}));

write('contact.html', pageHtml({
  title: 'Contact',
  description: `How to reach ${SITE.name}: contact form, coffee chat, or socials.`,
  path: '/contact',
  bodyHtml: `<h1>Contact</h1>\n${mdBodyToHtml(contactMdBody)}`,
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
write('posts.json', JSON.stringify(archive, null, 1));
write('developers.md', developersMd);
write('contact.md', contactMd);
write('openapi.json', openapi);
write('openapi.json.md', openapiMd);
write('.well-known/mcp/server-card.json', serverCard);
write('.well-known/mcp.json', serverCard);
write('mcp-server-card.json', serverCard);
write('server.json', serverJson);
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
/* JS-capable browsers hide the prerendered block (React repaints the page);
   crawlers and no-JS readers never add the .js class and see full content. */
.js .ssg{display:none}
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
