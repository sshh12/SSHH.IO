// Local replication of the is-agentic.com and Cloudflare Agent-Ready checks,
// so changes can be verified before/after deploy without waiting on rescans.
//
//   node scripts/agent-check.mjs                  # checks https://sshh.io
//   node scripts/agent-check.mjs --base <url>     # e.g. a deploy preview

const args = process.argv.slice(2);
const BASE = (args[args.indexOf('--base') + 1] && args.includes('--base')
  ? args[args.indexOf('--base') + 1]
  : 'https://sshh.io'
).replace(/\/$/, '');

let pass = 0, fail = 0, warn = 0;
const report = (ok, name, detail, isWarn = false) => {
  const tag = ok ? 'PASS' : isWarn ? 'WARN' : 'FAIL';
  if (ok) pass++; else if (isWarn) warn++; else fail++;
  console.log(`${tag}  ${name}${detail ? ` — ${detail}` : ''}`);
};

const get = (path, headers = {}) =>
  fetch(`${path.startsWith('http') ? path : BASE + path}`, {
    headers,
    redirect: 'manual',
    signal: AbortSignal.timeout(20000),
  });

const textOf = html =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

console.log(`agent-check against ${BASE}\n`);

// --- raw HTML content (the heaviest-weighted check) -------------------------
try {
  const res = await get('/');
  const html = await res.text();
  const text = textOf(html);
  report(res.status === 200, 'homepage 200', `status ${res.status}`);
  report(/<h1[^>]*>/i.test(html), 'homepage has <h1> in raw HTML');
  report(text.length >= 500, 'homepage ≥500 chars visible text', `${text.length} chars`);
  const ratio = (text.length / html.length) * 100;
  report(ratio >= 5, 'content efficiency ≥5%', `${ratio.toFixed(1)}%`);
  report(html.includes('application/ld+json'), 'homepage JSON-LD present');
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  let ldOk = ld.length > 0;
  try { ld.forEach(m => JSON.parse(m[1])); } catch { ldOk = false; }
  report(ldOk, 'JSON-LD parses', `${ld.length} block(s)`);
  report(/rel="canonical"/.test(html), 'canonical link present');
  report(/type="text\/markdown"/.test(html), 'rel=alternate markdown link present');
} catch (e) {
  report(false, 'homepage fetch', e.message);
}

// --- 404 behavior -----------------------------------------------------------
try {
  const res = await get('/zzz-definitely-not-a-page');
  const body = await res.text();
  report(res.status === 404, '404 status for unknown path', `status ${res.status}`);
  report(/llms\.txt/.test(body) && /sitemap/.test(body), '404 body has recovery links');
  const mdRes = await get('/zzz-definitely-not-a-page', { accept: 'text/markdown' });
  const mdCt = mdRes.headers.get('content-type') || '';
  report(mdRes.status === 404 && mdCt.includes('text/markdown'), '404 markdown body on Accept: text/markdown', `status ${mdRes.status}, ${mdCt}`);
  const jsonRes = await get('/api/v1/zzz-nope.json', { accept: 'application/json' });
  const jsonCt = jsonRes.headers.get('content-type') || '';
  let problemOk = false;
  try { problemOk = jsonRes.status === 404 && jsonCt.includes('problem+json') && (await jsonRes.json()).status === 404; } catch {}
  report(problemOk, 'API 404 returns RFC 9457 problem+json', `status ${jsonRes.status}, ${jsonCt}`);
} catch (e) {
  report(false, '404 check', e.message);
}

// --- markdown negotiation (acceptmarkdown.com) ------------------------------
try {
  const res = await get('/', { accept: 'text/markdown' });
  const ct = res.headers.get('content-type') || '';
  const vary = res.headers.get('vary') || '';
  report(ct.includes('text/markdown'), 'Accept: text/markdown → text/markdown', `got ${ct}`);
  report(/accept/i.test(vary), 'Vary includes Accept', `got "${vary}"`);
  const qres = await get('/', { accept: 'text/markdown;q=0.9,text/html;q=1.0' });
  const qct = qres.headers.get('content-type') || '';
  report(qct.includes('text/html'), 'q-values honored (html preferred → html)', `got ${qct}`);
  const htmlRes = await get('/', { accept: 'text/html' });
  report(/accept/i.test(htmlRes.headers.get('vary') || ''), 'HTML variant also sends Vary: Accept');
} catch (e) {
  report(false, 'markdown negotiation', e.message);
}

// --- robots.txt -------------------------------------------------------------
try {
  const res = await get('/robots.txt');
  const body = await res.text();
  report(res.status === 200, 'robots.txt 200');
  report(/^Sitemap:/m.test(body), 'robots.txt has Sitemap directive');
  report(/GPTBot/.test(body) && /ClaudeBot/.test(body), 'robots.txt has AI-bot rules');
  report(/Content-Signal:/.test(body), 'robots.txt has Content-Signal');
} catch (e) {
  report(false, 'robots.txt', e.message);
}

// --- files that must exist --------------------------------------------------
const mustExist = [
  ['/sitemap.xml', 'xml'],
  ['/llms.txt', null],
  ['/llms-full.txt', null],
  ['/projects.json', 'json'],
  ['/index.md', 'markdown'],
  ['/code.md', 'markdown'],
  ['/writing.md', 'markdown'],
  ['/about.md', 'markdown'],
  ['/about', null],
  ['/writing', null],
  ['/privacy', null],
  ['/.well-known/api-catalog', 'linkset+json'],
  ['/.well-known/ai-catalog.json', 'json'],
  ['/.well-known/agent-skills/index.json', 'json'],
  ['/.well-known/mcp/server-card.json', 'json'],
  ['/openapi.json', 'json'],
  ['/openapi.json.md', 'markdown'],
  ['/developers', null],
  ['/developers.md', 'markdown'],
  ['/contact', null],
  ['/contact.md', 'markdown'],
  ['/api/v1/projects.json', 'json'],
  ['/api/v1/posts.json', 'json'],
  ['/.well-known/mcp.json', 'json'],
  ['/server.json', 'json'],
];
for (const [path, expectType] of mustExist) {
  try {
    const res = await get(path);
    const ct = res.headers.get('content-type') || '';
    const ok = res.status === 200 && (!expectType || ct.includes(expectType));
    report(ok, `${path}`, `status ${res.status}, ${ct}`);
  } catch (e) {
    report(false, path, e.message);
  }
}

// --- sitemap URLs resolve ---------------------------------------------------
try {
  const res = await get('/sitemap.xml');
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  let bad = 0;
  for (const loc of locs) {
    const target = loc.replace('https://sshh.io', BASE);
    const r = await get(target);
    if (r.status !== 200) bad++;
  }
  report(bad === 0, `sitemap URLs all 200`, `${locs.length} URLs, ${bad} broken`);
} catch (e) {
  report(false, 'sitemap URL check', e.message);
}

// --- Link header ------------------------------------------------------------
try {
  const res = await get('/');
  const link = res.headers.get('link') || '';
  report(/rel="api-catalog"/.test(link), 'Link header advertises api-catalog', link.slice(0, 100));
} catch (e) {
  report(false, 'Link header', e.message);
}

// --- agent-skills digest ----------------------------------------------------
try {
  const idx = await (await get('/.well-known/agent-skills/index.json')).json();
  const skill = idx.skills[0];
  const md = await (await get(skill.url.replace('https://sshh.io', BASE))).text();
  const { createHash } = await import('node:crypto');
  const digest = 'sha256:' + createHash('sha256').update(md).digest('hex');
  report(digest === skill.digest, 'agent-skills digest matches SKILL.md', digest === skill.digest ? '' : `index=${skill.digest.slice(0, 20)}… actual=${digest.slice(0, 20)}…`);
} catch (e) {
  report(false, 'agent-skills digest', e.message);
}

// --- server card completeness ----------------------------------------------
try {
  const card = await (await get('/.well-known/mcp/server-card.json')).json();
  const ok = card.name && card.description && card.version && card.serverUrl && Array.isArray(card.tools) && card.tools.length >= 7;
  report(ok, 'server card has name/description/version/serverUrl/tools', `tools: ${(card.tools || []).length}`);
} catch (e) {
  report(false, 'server card completeness', e.message);
}

// --- MCP -------------------------------------------------------------------
try {
  const res = await fetch(`${BASE}/mcp`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'agent-check', version: '1.0' } } }),
    signal: AbortSignal.timeout(20000),
  });
  const raw = await res.text();
  const okInit = res.ok && /serverInfo/.test(raw);
  report(okInit, 'MCP /mcp initialize', `status ${res.status}${okInit ? '' : `, body: ${raw.slice(0, 120)}`}`);
  const bad = await fetch(`${BASE}/mcp`, { method: 'GET', signal: AbortSignal.timeout(15000) });
  const badCt = bad.headers.get('content-type') || '';
  report(bad.status === 405 && badCt.includes('json'), 'MCP GET returns structured JSON error', `status ${bad.status}, ${badCt}`);
} catch (e) {
  report(false, 'MCP /mcp initialize', e.message);
}

// --- Substack guard ---------------------------------------------------------
try {
  const res = await fetch('https://blog.sshh.io/robots.txt', { signal: AbortSignal.timeout(15000) });
  const body = await res.text();
  const blocked = /User-agent:\s*(GPTBot|ClaudeBot|anthropic-ai|PerplexityBot|Google-Extended)[\s\S]{0,50}?Disallow:\s*\/\s*$/im.test(body);
  report(!blocked, 'blog.sshh.io robots.txt still allows AI crawlers', blocked ? 'AI-crawler Disallow detected — the Substack "Block AI training" toggle may have been flipped!' : '');
} catch (e) {
  report(false, 'Substack robots guard', e.message, true);
}

console.log(`\n${pass} passed, ${fail} failed, ${warn} warnings`);
process.exit(fail > 0 ? 1 : 0);
