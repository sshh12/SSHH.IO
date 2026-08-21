// Minimal HTML -> markdown-ish text conversion (build-time only; good enough
// for llms-full.txt, which is an agent surface, not a rendered page).
export function htmlToMd(html) {
  let s = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/gi, ' ($1) ')
    .replace(/<h([1-6])[^>]*>/gi, (_, n) => `\n\n${'#'.repeat(Number(n))} `)
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<li[^>]*>/gi, '\n- ')
    .replace(/<\/li>/gi, '')
    .replace(/<blockquote[^>]*>/gi, '\n\n> ')
    .replace(/<\/blockquote>/gi, '\n\n')
    .replace(/<pre[^>]*>/gi, '\n\n```\n')
    .replace(/<\/pre>/gi, '\n```\n\n')
    .replace(/<(?:p|div|section|figure|ul|ol|tr)[^>]*>/gi, '\n')
    .replace(/<\/(?:p|div|section|figure|ul|ol|tr)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, '')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => {
      const t = text.replace(/<[^>]+>/g, '').trim();
      return t && href.startsWith('http') ? `[${t}](${href})` : t;
    })
    .replace(/<(?:strong|b)>/gi, '**')
    .replace(/<\/(?:strong|b)>/gi, '**')
    .replace(/<(?:em|i)>/gi, '*')
    .replace(/<\/(?:em|i)>/gi, '*')
    .replace(/<code[^>]*>/gi, '`')
    .replace(/<\/code>/gi, '`')
    .replace(/<[^>]+>/g, '');
  s = s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, c) => String.fromCharCode(c));
  return s.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}
