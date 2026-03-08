import React, { useState } from 'react';
import Projects from '../projects';
import './CodeGallery.css';

function getURLQuery() {
  return window.decodeURI(window.location.search.replace('?q=', ''));
}

function makeProjectRepr(project) {
  let repr = Object.values(project).join('');
  if (project.hack) repr += ' greyhat whitehat ethical hacking security';
  if (project.github) repr += ' github open-source';
  if (project.url) repr += ' online webpage linked';
  if (project.team) repr += ' team' + project.team;
  if (project.wip) repr += ' wip todo inprogress';
  if (project.private) repr += ' private';
  else repr += 'complete';
  if (/\bML\b/.test(project.tags)) repr += ' machine learning';
  if (/\bRL\b/.test(project.tags)) repr += ' reinforcement learning';
  if (/\bNLP\b/.test(project.tags)) repr += ' natural language processing';
  if (/\bCV\b/.test(project.tags)) repr += ' computer vision';
  return repr.toLocaleLowerCase();
}

const allProjects = Projects.map((project) => ({
  title: project.title,
  desc: project.tagline,
  descs: project.desc || [],
  img: project.thumb || '/images/no-pic.png',
  thumb: project.thumb || '/images/no-pic.png',
  date: new Date(project.start) || new Date(),
  repr: makeProjectRepr(project),
  meta: project,
}));

const sorts = [
  {
    name: 'Viewing Chronologically',
    sort: (a, b) => b.date.getTime() - a.date.getTime(),
    title: (item) => item.title,
  },
  {
    name: 'Sorted By Language',
    sort: (a, b) => b.meta.language.localeCompare(a.meta.language),
    title: (item) => `${item.title} (${item.meta.language})`,
  },
  {
    name: 'Sorted By Domain',
    sort: (a, b) => a.meta.domain.localeCompare(b.meta.domain),
    title: (item) => `${item.title} (${item.meta.domain})`,
  },
];

const GitHubSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const BookSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const LockSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

function CodeGallery() {
  let [sort, setSort] = useState(sorts[0]);
  let [query, _setQuery] = useState(getURLQuery());
  let setQuery = (value) => {
    window.history.replaceState(null, null, '?q=' + value);
    _setQuery(value);
  };
  let items = [...allProjects].sort(sort.sort);
  if (query.length > 0) {
    items = items.filter((item) => item.repr.includes(query.toLocaleLowerCase()));
  }
  return (
    <div className="page page-gallery">
      <a href="/" className="page-back">
        &larr; Back
      </a>
      <h1 className="page-title">Project Gallery</h1>
      <p className="page-subtitle">
        {items.length} projects · Last updated{' '}
        {new Date(Math.max(...allProjects.map((item) => item.date.getTime()))).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </p>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="search-input"
        type="text"
        placeholder="Search projects..."
      />
      <div className="sort-bar">
        {sorts.map((s, i) => (
          <button
            key={s.name}
            onClick={() => setSort(sorts[i])}
            type="button"
            className={`sort-pill${sort === s ? ' active' : ''}`}
          >
            {s.name.replace('Viewing ', '').replace('Sorted By ', '')}
          </button>
        ))}
      </div>
      <div className="sort-label">{sort.name}</div>
      <div className="project-grid">
        {items.map((item) => (
          <div className="project-card" key={item.title}>
            <div className="project-title">{sort.title(item)}</div>
            <div className="project-date">{item.meta.start}</div>
            <div className="project-desc">{item.desc}</div>
            <div className="project-links">
              {item.meta.github && (
                <a href={item.meta.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                  <GitHubSVG />
                </a>
              )}
              {item.meta.url && (
                <a href={item.meta.url} target="_blank" rel="noopener noreferrer" title="Website">
                  <LinkSVG />
                </a>
              )}
              {item.meta.article && (
                <a href={item.meta.article} target="_blank" rel="noopener noreferrer" title="Article">
                  <BookSVG />
                </a>
              )}
              {item.meta.private && (
                <a
                  href="#priv"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(
                      "This project is private. Feel free to contact me if you're interested in the source code."
                    );
                  }}
                  title="Private"
                >
                  <LockSVG />
                </a>
              )}
            </div>
            <div className="project-badges">
              {item.meta.hack && <span className="badge badge-hack">Hacking</span>}
              {item.meta.tiny && <span className="badge badge-tiny">Mini</span>}
              {item.meta.wip && <span className="badge badge-wip">WIP</span>}
              {item.meta.team && <span className="badge badge-team">{item.meta.team}</span>}
            </div>
            {item.meta.desc && (
              <div className="project-details">
                <ul>
                  {item.meta.desc.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            )}
            {item.img && <img className="project-thumb" loading="lazy" alt={item.title} src={item.img} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CodeGallery;
