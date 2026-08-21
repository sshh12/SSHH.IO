// Single source of truth for identity/contact/link data.
// Consumed by the React app (Index.jsx), the agent-surface build step
// (scripts/generate-agent-surface.mjs), and any future MCP server.
// Keep facts here in sync with LinkedIn/GitHub/Substack profiles — entity
// consistency across surfaces is load-bearing for search/AI visibility.

const SITE = {
  name: 'Shrivu Shankar',
  domain: 'https://sshh.io',
  role: 'VP, AI', // display shorthand used on the site
  roleFull: 'VP, AI Strategy', // LinkedIn-verbatim title — used in structured data
  company: { name: 'Abnormal AI', url: 'https://abnormal.ai/' },
  location: 'San Francisco',
  education: {
    school: 'The University of Texas at Austin',
    url: 'https://www.utexas.edu/',
    degree: 'BS, Computer Science',
    years: '2018–2022',
  },
  bio: 'Building AI-native security at Abnormal AI. Writing about coding agents, LLM systems, and the future of software engineering.',
  topics: [
    'coding agents',
    'LLM systems',
    'AI security',
    'AI transformation',
    'Model Context Protocol (MCP)',
    'software engineering',
    'machine learning',
  ],
  blog: {
    name: "Shrivu's Substack",
    url: 'https://blog.sshh.io/',
    feed: 'https://blog.sshh.io/feed',
    sitemap: 'https://blog.sshh.io/sitemap.xml',
    archiveApi: 'https://blog.sshh.io/api/v1/archive',
  },
  coffeeChat: {
    page: 'https://sshh.io/coffee-chat',
    scheduleUrl: 'https://calendar.app.google/UQ1x6RLisATBm64S6',
    blurb:
      'Open to virtual chats or in-person coffee in San Francisco (Embarcadero/Montgomery area) about AI, agents, careers, and startup ideas. Not for recruitment, referrals, or sales pitches.',
  },
  contactForm: 'https://forms.gle/m7FMe8beVMH5Z33d9',
  socials: [
    { label: 'GitHub', url: 'https://github.com/sshh12' },
    { label: 'X', url: 'https://x.com/ShrivuShankar' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/shrivushankar/' },
    { label: 'RSS', url: 'https://blog.sshh.io/feed' },
  ],
  // sameAs-only profiles (entity corroboration; not shown in the site's social row)
  profiles: [
    { label: 'Hacker News', url: 'https://news.ycombinator.com/user?id=sshh12' },
    { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=bIUsRBQAAAAJ' },
  ],
};

export default SITE;
