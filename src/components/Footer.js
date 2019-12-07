import React from 'react';
import LinkIcons from './LinkIcons';

function Footer() {
  return (
    <footer id="footer" className="panel">
      <div className="inner split">
        <div>
          <section>
            <h2>Links</h2>
          </section>
          <section>
            <LinkIcons />
          </section>
        </div>
        <div>
          <section>
            <form method="POST" action="https://formspree.io/shrivu1122@gmail.com">
              <div className="fields">
                <div className="field half">
                  <input type="text" name="name" id="name" placeholder="Name" />
                </div>
                <div className="field half">
                  <input type="text" name="email" id="email" placeholder="Email" />
                </div>
                <div className="field">
                  <textarea name="message" id="message" rows="4" placeholder="Message"></textarea>
                </div>
              </div>
              <ul className="actions">
                <li><input type="submit" value="Send" className="primary" /></li>
                <li><input type="reset" value="Reset" /></li>
              </ul>
            </form>
          </section>
        </div>
      </div>
    </footer>
  );
}

export default Footer;