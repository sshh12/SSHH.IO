import React, { useState } from 'react';
import LinkIcons from './LinkIcons';

function Index() {
  let search = window.location.search;
  return (
    <div style={{ textAlign: 'left' }}>
      <header id="header">
        <h1>Shrivu Shankar</h1>
        <p>A coder, hacker, and AI doer @ <a href="https://www.cs.utexas.edu/">UT CS</a>.</p>
      </header>
      {search.includes('formsubmitted') && <p>Form submitted!</p>}
      <h2><a href="/code" style={{borderBottom: 'none'}}>Code</a></h2>
      <h2><a href="/photos" style={{borderBottom: 'none'}}>Photography</a></h2>
      <h2><a href="/resume" style={{borderBottom: 'none'}}>Resume</a></h2>
      <footer id="footer" style={{left: '0', bottom: '0'}}>
        <LinkIcons />
      </footer>
      <link rel="stylesheet" href="/assets/eventually/css/main.css" />
    </div>
  );
}

export default Index;