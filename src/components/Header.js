import React from 'react';

function Header() {
  return (
    <header id="header">
      <h1><a href="index.html"><strong>Shrivu Shankar</strong> @ UT CS</a></h1>
      <nav>
        <ul>
          <li><a href="#footer" className="icon solid fa-info-circle">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;