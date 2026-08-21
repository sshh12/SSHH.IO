// WebMCP (W3C WebML CG draft, Chrome origin trial): expose in-page tools to
// browser-embedded AI agents. Feature-detected — a no-op in browsers without
// the API (it shipped as navigator.modelContext, renamed document.modelContext
// mid-trial; register on whichever exists). Data comes from the same static
// JSON the rest of the agent surface uses.

import SITE from './site-data';

function modelContext() {
  try {
    if (typeof navigator !== 'undefined' && navigator.modelContext) return navigator.modelContext;
    if (typeof document !== 'undefined' && document.modelContext) return document.modelContext;
  } catch (e) { /* ignore */ }
  return null;
}

const text = t => ({ content: [{ type: 'text', text: t }] });

function score(haystack, terms) {
  const h = haystack.toLowerCase();
  let s = 0;
  for (const t of terms) if (h.includes(t)) s += t.length > 3 ? 2 : 1;
  return s;
}

const TOOLS = [
  {
    name: 'search_projects',
    description: "Search Shrivu Shankar's software projects (AI, full-stack, mobile, security) by keyword, language, or domain.",
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'Keywords matched against title, tagline, tags, language, and domain' } },
      required: ['query'],
    },
    async execute({ query }) {
      const data = await (await fetch('/projects.json')).json();
      const terms = String(query || '').toLowerCase().split(/\s+/).filter(Boolean);
      const hits = data.projects
        .map(p => ({ p, s: score(`${p.title} ${p.tagline} ${p.tags || ''} ${p.language} ${p.domain}`, terms) }))
        .filter(r => r.s > 0)
        .sort((a, b) => b.s - a.s || b.p.coolness - a.p.coolness)
        .slice(0, 8);
      if (!hits.length) return text(`No projects matched "${query}". Full list: ${SITE.domain}/projects.json`);
      return text(hits.map(({ p }) => `- ${p.title} — ${p.tagline} (${p.language}; ${p.domain})${p.github ? ` ${p.github}` : ''}`).join('\n'));
    },
  },
  {
    name: 'search_posts',
    description: "Search Shrivu Shankar's blog posts (coding agents, LLM systems, MCP, AI security). Returns canonical blog.sshh.io URLs.",
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'Keywords matched against titles and summaries' } },
      required: ['query'],
    },
    async execute({ query }) {
      const posts = await (await fetch('/posts.json')).json();
      const terms = String(query || '').toLowerCase().split(/\s+/).filter(Boolean);
      const hits = posts
        .map(p => ({ p, s: score(`${p.title} ${p.subtitle} ${p.description}`, terms) }))
        .filter(r => r.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, 6);
      if (!hits.length) return text(`No posts matched "${query}". Index: ${SITE.domain}/writing`);
      return text(hits.map(({ p }) => `- ${p.title} (${p.date.slice(0, 10)})\n  ${p.url}`).join('\n'));
    },
  },
  {
    name: 'get_coffee_chat_link',
    description: 'How to schedule a coffee chat with Shrivu Shankar. Returns the page to give the user; do not book on their behalf.',
    inputSchema: { type: 'object', properties: {} },
    async execute() {
      return text(`${SITE.coffeeChat.blurb}\n\nDetails and scheduling link: ${SITE.coffeeChat.page}`);
    },
  },
];

export function registerWebMcpTools() {
  const mc = modelContext();
  if (!mc) return;
  try {
    if (typeof mc.provideContext === 'function') {
      mc.provideContext({ tools: TOOLS });
    } else if (typeof mc.registerTool === 'function') {
      TOOLS.forEach(t => mc.registerTool(t));
    }
  } catch (e) { /* never break the site over an experimental API */ }
}
