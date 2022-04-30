import React from 'react';
import LinkIcons from './LinkIcons';
import './Index.css';

function Index() {
  let search = window.location.search;
  return (
    <div style={{ textAlign: 'left' }}>
      <header id="header">
        <h1>Shrivu Shankar</h1>
        <p>
          Machine Learning Engineer @ <a href="https://abnormalsecurity.com/">Abnormal Security</a>.
        </p>
      </header>
      {search.includes('formsubmitted') && <p>Form submitted!</p>}
      <h2>
        <a href="/code" style={{ borderBottom: 'none' }}>
          Projects
        </a>
      </h2>
      <h2>
        <a href="/resume" style={{ borderBottom: 'none' }}>
          Resume
        </a>
      </h2>
      <footer id="footer" style={{ left: '32px', bottom: '32px' }}>
        <LinkIcons />
      </footer>
    </div>
  );
}

export default Index;
