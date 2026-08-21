// Content negotiation for agents (acceptmarkdown.com): requests preferring
// text/markdown get the prebuilt .md mirror of the page; everyone else gets
// HTML. Both variants send Vary: Accept so the CDN caches them separately.

const MD_FOR = {
  '/': '/index.md',
  '/code': '/code.md',
  '/coffee-chat': '/coffee-chat.md',
  '/about': '/about.md',
  '/writing': '/writing.md',
  '/privacy': '/privacy.md',
};

// Parse an Accept header into [{type, q}] entries.
function parseAccept(header) {
  return header
    .split(',')
    .map(part => {
      const [type, ...params] = part.trim().split(';');
      let q = 1;
      for (const p of params) {
        const [k, v] = p.trim().split('=');
        if (k === 'q') q = parseFloat(v);
      }
      return { type: type.trim().toLowerCase(), q: isNaN(q) ? 1 : q };
    })
    .filter(e => e.type);
}

function qFor(entries, target) {
  const [maj] = target.split('/');
  let best = 0;
  for (const e of entries) {
    if (e.type === target || e.type === `${maj}/*` || e.type === '*/*') {
      best = Math.max(best, e.q);
    }
  }
  return best;
}

export default async (request, context) => {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/, '') || '/';
  const mdPath = MD_FOR[path];

  const accept = request.headers.get('accept') || '*/*';
  const entries = parseAccept(accept);
  const qMd = qFor(entries, 'text/markdown');
  const qHtml = qFor(entries, 'text/html');

  if (mdPath && qMd > 0 && qMd >= qHtml) {
    const resp = await context.rewrite(mdPath);
    const headers = new Headers(resp.headers);
    headers.set('content-type', 'text/markdown; charset=utf-8');
    headers.set('vary', 'Accept');
    headers.set('x-markdown-source', mdPath);
    return new Response(resp.body, { status: resp.status, headers });
  }

  if (mdPath && qMd === 0 && qHtml === 0) {
    // Explicit Accept for something we can't serve at all.
    return new Response(
      `406 Not Acceptable. This resource is available as text/html or text/markdown (${mdPath}).\n`,
      { status: 406, headers: { 'content-type': 'text/plain; charset=utf-8', vary: 'Accept' } }
    );
  }

  const resp = await context.next();
  const headers = new Headers(resp.headers);
  headers.set('vary', 'Accept');
  return new Response(resp.body, { status: resp.status, headers });
};

export const config = {
  path: ['/', '/code', '/coffee-chat', '/about', '/writing', '/privacy'],
};
