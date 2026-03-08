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

### Design Tokens
The site uses CSS custom properties defined in the root stylesheet:
- Fonts: `--font-display` (Plus Jakarta Sans), `--font-mono` (IBM Plex Mono)
- Colors: `--bg` (#faf8f4), `--text` (#151513), `--accent` (#2a6b4f), `--border` (#dbd6cc)

### Key Features
- Client-side search/filtering across all projects
- Multiple sorting options (chronological, by language, by domain)
- Responsive design for mobile/desktop
- Emoji hover animation on coffee chat page
