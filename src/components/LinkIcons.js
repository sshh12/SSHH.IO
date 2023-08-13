import React from 'react';

function LinkIcons() {
  return (
    <ul className="icons">
      <li>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() =>
            alert(
              String.fromCharCode(
                ...[
                  0x73, 0x68, 0x72, 0x69, 0x76, 0x75, 0x31, 0x31, 0x32, 0x32, 0x40, 0x67, 0x6d, 0x61, 0x69, 0x6c, 0x2e,
                  0x63, 0x6f, 0x6d,
                ]
              )
            )
          }
          className="icon far fa-envelope"
        >
          <span className="label"></span>
        </div>
      </li>
      <li>
        <a href="https://www.facebook.com/profile.php?id=100009826364352" className="icon brands fa-facebook-f">
          <span className="label">Facebook</span>
        </a>
      </li>
      <li>
        <a href="https://www.instagram.com/shrivu1122/" className="icon brands fa-instagram">
          <span className="label">Instagram</span>
        </a>
      </li>
      <li>
        <a href="https://github.com/sshh12" className="icon brands fa-github">
          <span className="label">GitHub</span>
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/shrivushankar/" className="icon brands fa-linkedin-in">
          <span className="label">LinkedIn</span>
        </a>
      </li>
      <li>
        <a href="https://twitter.com/ShrivuShankar" className="icon brands fa-twitter">
          <span className="label">Twitter</span>
        </a>
      </li>
    </ul>
  );
}

export default LinkIcons;
