# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production with Vite (outputs to `dist/`)
- `npm run preview` - Preview production build locally

## Project Architecture

This is a personal portfolio website for Shrivu Shankar built with Vite + React. Hosted on Netlify.

### Frontend (React)
- **Main App**: `src/App.jsx` - Handles routing between index view (/), code gallery view (/code), and coffee chat view (/coffee-chat)
- **Components**:
  - `src/components/Index.jsx` - Homepage landing page with bio, navigation links, and social icons
  - `src/components/CodeGallery.jsx` - Searchable/sortable project gallery with filtering
  - `src/components/CoffeeChat.jsx` - Coffee chat scheduling page with emoji hover effect
  - `src/components/LinkIcons.jsx` - Social media link icons (SVG-based)
- **Styles**: `src/components/Index.css` - Shared stylesheet with design tokens and component styles
- **Data**: `src/projects.js` - Array of all project metadata (titles, descriptions, links, technologies, etc.)

### Static Assets
- `public/` - Contains favicon variations and manifest.json
- `public/apps/` - Collection of standalone HTML/JS mini-applications (frequency visualizer, hangman solver, etc.)

### Build & Deploy
- Vite builds to `dist/` directory
- `netlify.toml` handles routing redirects for `/code*`, `/contact*`, `/coffee-chat`, etc.

### Project Structure
- Projects are categorized by domain (AI, Full Stack, Frontend, Backend, etc.)
- Each project includes metadata: title, tagline, language, tags, GitHub links, start date, coolness rating
- CodeGallery component provides search functionality across all project metadata
- Some projects marked as "tiny" (mini projects), "hack" (ethical hacking), "wip" (work in progress), or "private"

### Design System — "V2d Jakarta Green"

**Tokens** (defined in `src/index.css`, dark overrides via `[data-theme="dark"]`):

| Token | Light | Dark |
|-------|-------|------|
| `--bg` | `#faf8f4` | `#1a1917` |
| `--text` | `#151513` | `#e8e6e1` |
| `--text-mid` | `#2a2a27` | `#cccbc5` |
| `--text-muted` | `#555550` | `#9a9990` |
| `--text-dim` | `#6b6b63` | `#6e6e65` |
| `--accent` | `#2a6b4f` | `#3d9e74` |
| `--accent-hover` | `#1e5039` | `#4db888` |
| `--border` | `#dbd6cc` | `#2e2d29` |
| `--card-bg` | `#ffffff` | `#232220` |

**Typography**: `--font-display` (Plus Jakarta Sans) for headings, `--font-mono` (IBM Plex Mono) for body/UI. Body is 0.9rem/1.7.

**Conventions**:
- Pill buttons: `border-radius: 100px`, 1.5px border, mono font
- Cards: `border-radius: 12px`, 1.5px border, hover lift (`translateY(-2px)`)
- Transitions: `0.25s var(--ease)` where `--ease: cubic-bezier(0.4, 0, 0.2, 1)`
- Icons: inline SVGs with `fill: currentColor` or `stroke: currentColor`, 16×16px
- Spacing: use `clamp()` for responsive padding
- Dark mode: toggle persisted to `localStorage`, defaults to `prefers-color-scheme`
- No external icon libraries (no Font Awesome, no Bootstrap)

**Shared styles**: `src/components/Index.css` contains landing page styles + shared page layout (`.page`, `.page-back`, `.page-title`) + coffee chat styles. `src/components/CodeGallery.css` is gallery-specific.

### Key Features
- Lazy-loaded routes (CodeGallery + CoffeeChat are code-split chunks)
- Client-side search/filtering across all projects
- Multiple sorting options (chronological, by language, by domain)
- Dark mode with system preference detection
- Responsive design (480px breakpoint)
- Emoji hover animation on coffee chat page
