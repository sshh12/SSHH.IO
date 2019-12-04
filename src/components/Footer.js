import React from 'react';

function Footer() {
  return (
    <footer id="footer" className="panel">
      <div className="inner split">
        <div>
          <section>
            <h2>Links</h2>
          </section>
          <section>
            <ul className="icons">
              <li><a href="https://www.facebook.com/profile.php?id=100009826364352" className="icon brands fa-facebook-f"><span className="label">Facebook</span></a></li>
              <li><a href="https://www.instagram.com/shrivu1122/" className="icon brands fa-instagram"><span className="label">Instagram</span></a></li>
              <li><a href="https://github.com/sshh12" className="icon brands fa-github"><span className="label">GitHub</span></a></li>
              <li><a href="https://www.linkedin.com/in/shrivushankar/" className="icon brands fa-linkedin-in"><span className="label">LinkedIn</span></a></li>
            </ul>
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