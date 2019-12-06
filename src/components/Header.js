import React from 'react';

function Header() {
  let showLabel = (window.innerWidth > 500);
  return (
    <header id="header">
      <h1><a href="/"><strong>Shrivu Shankar</strong> @ UT CS</a></h1>
      <nav>
        <ul>
          <li><a href="#footer" className="icon solid fa-info-circle">{showLabel ? 'Contact' : ''}</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;