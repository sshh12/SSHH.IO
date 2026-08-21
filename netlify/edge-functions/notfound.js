// Agent-friendly 404s: when a request that explicitly accepts text/markdown
// hits an unknown path, answer with a short markdown body (recovery links)
// instead of the HTML 404 page. All other traffic passes through untouched.

const MD_404 = `# 404 — page not found

This page does not exist on sshh.io. Valid pages:

- [Home](https://sshh.io/) — Shrivu Shankar, VP, AI @ Abnormal AI
- [Projects](https://sshh.io/code) ([data](https://sshh.io/projects.json))
- [Writing index](https://sshh.io/writing)
- [About](https://sshh.io/about)
- [Coffee chat](https://sshh.io/coffee-chat)
- [Developers & agents](https://sshh.io/developers)
- [Blog (essays)](https://blog.sshh.io/)

Machine-readable: [llms.txt](https://sshh.io/llms.txt) · [sitemap.xml](https://sshh.io/sitemap.xml) · MCP at https://sshh.io/mcp
`;

export default async (request, context) => {
  const resp = await context.next();
  if (resp.status !== 404) return resp;
  const accept = (request.headers.get('accept') || '').toLowerCase();
  const path = new URL(request.url).pathname;
  // API-shaped misses get RFC 9457 problem+json so agents can parse the error.
  if (accept.includes('application/json') || path.startsWith('/api/') || path.endsWith('.json')) {
    return new Response(
      JSON.stringify({
        type: 'about:blank',
        title: 'Not Found',
        status: 404,
        detail: `${path} does not exist. See https://sshh.io/openapi.json for available endpoints, or https://sshh.io/llms.txt for a site guide.`,
        instance: path,
      }),
      { status: 404, headers: { 'content-type': 'application/problem+json', vary: 'Accept' } }
    );
  }
  if (!accept.includes('text/markdown') && !accept.includes('text/plain')) return resp;
  return new Response(MD_404, {
    status: 404,
    headers: { 'content-type': 'text/markdown; charset=utf-8', vary: 'Accept' },
  });
};

export const config = {
  path: '/*',
  excludedPath: ['/assets/*', '/apps/*', '/images/*', '/*.png', '/*.ico', '/*.svg', '/mcp'],
};
