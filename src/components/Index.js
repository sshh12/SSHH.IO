import React, { useState } from 'react';
import LinkIcons from './LinkIcons';
import './Index.scss';

function Index() {
  let search = window.location.search;
  return (
    <div style={{ textAlign: 'left' }}>
      <header id="header">
        <h1>Shrivu Shankar</h1>
        <p>A student, engineer, researcher @ <a href="https://www.cs.utexas.edu/">UT CS</a>.</p>
      </header>
      {search.includes('formsubmitted') && <p>Form submitted!</p>}
      <h2><a href="/code" style={{borderBottom: 'none'}}>Code</a></h2>
      {/* <h2><a href="/photos" style={{borderBottom: 'none'}}>Photography</a></h2> */}
      <h2><a href="/resume" style={{borderBottom: 'none'}}>Resume</a></h2>
      <footer id="footer" style={{left: '32px', bottom: '32px'}}>
        <LinkIcons />
      </footer>
    </div>
  );
}

export default Index;