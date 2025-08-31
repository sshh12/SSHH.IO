# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start React development server (uses react-scripts start)
- `npm run build` - Build React app for production (uses react-scripts build)
- `npm start` - Start production Express server (serves built files from /build)

## Project Architecture

This is a personal portfolio website for Shrivu Shankar built with React and Express.

### Frontend (React)
- **Main App**: `src/App.js` - Handles routing between index view (/) and code gallery view (/code)
- **Components**:
  - `src/components/Index.js` - Homepage with links to projects, blog, and contact
  - `src/components/CodeGallery.js` - Searchable/sortable project gallery with filtering
  - `src/components/LinkIcons.js` - Social media link icons
- **Data**: `src/projects.js` - Array of all project metadata (titles, descriptions, links, technologies, etc.)

### Backend (Express)
- **Server**: `server.js` - Simple Express server that serves built React files and handles redirects
- **Routes**:
  - `/` - Serves main React app
  - `/resume` - Redirects to Google Forms
  - `/code*` and `/contact*` - Handled by netlify.toml redirects

### Static Assets
- `public/` - Contains favicon variations, manifest.json, and embedded mini-apps
- `public/apps/` - Collection of standalone HTML/JS mini-applications (frequency visualizer, hangman solver, etc.)

### Project Structure
- Projects are categorized by domain (AI, Full Stack, Frontend, Backend, etc.)
- Each project includes metadata: title, tagline, language, tags, GitHub links, start date, coolness rating
- CodeGallery component provides search functionality across all project metadata
- Some projects marked as "tiny" (mini projects), "hack" (ethical hacking), "wip" (work in progress), or "private"

### Key Features
- Client-side search/filtering across all projects
- Multiple sorting options (chronological, by language, by domain)
- Progress bar during page scroll
- Responsive design for mobile/desktop