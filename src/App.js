import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App" id="wrapper">
      <header id="header">
        <h1><a href="index.html"><strong>Multiverse</strong> by HTML5 UP</a></h1>
        <nav>
          <ul>
            <li><a href="#footer" className="icon solid fa-info-circle">About</a></li>
          </ul>
        </nav>
      </header>
      <div id="main">
        <article className="thumb">
          <a href="images/fulls/01.jpg" className="image"><img src="images/thumbs/01.jpg" alt="" /></a>
          <h2>Magna feugiat lorem</h2>
          <p>Nunc blandit nisi ligula magna sodales lectus elementum non. Integer id venenatis velit.</p>
        </article>
        <article className="thumb">
          <a href="images/fulls/02.jpg" className="image"><img src="images/thumbs/02.jpg" alt="" /></a>
          <h2>Nisl adipiscing</h2>
          <p>Nunc blandit nisi ligula magna sodales lectus elementum non. Integer id venenatis velit.</p>
        </article>
        <article className="thumb">
          <a href="images/fulls/03.jpg" className="image"><img src="images/thumbs/03.jpg" alt="" /></a>
          <h2>Tempus aliquam veroeros</h2>
          <p>Nunc blandit nisi ligula magna sodales lectus elementum non. Integer id venenatis velit.</p>
        </article>
        <article className="thumb">
          <a href="images/fulls/04.jpg" className="image"><img src="images/thumbs/04.jpg" alt="" /></a>
          <h2>Aliquam ipsum sed dolore</h2>
          <p>Nunc blandit nisi ligula magna sodales lectus elementum non. Integer id venenatis velit.</p>
        </article>
        <article className="thumb">
          <a href="images/fulls/05.jpg" className="image"><img src="images/thumbs/05.jpg" alt="" /></a>
          <h2>Cursis aliquam nisl</h2>
          <p>Nunc blandit nisi ligula magna sodales lectus elementum non. Integer id venenatis velit.</p>
        </article>
        <article className="thumb">
          <a href="images/fulls/06.jpg" className="image"><img src="images/thumbs/06.jpg" alt="" /></a>
          <h2>Sed consequat phasellus</h2>
          <p>Nunc blandit nisi ligula magna sodales lectus elementum non. Integer id venenatis velit.</p>
        </article>
        <article className="thumb">
          <a href="images/fulls/07.jpg" className="image"><img src="images/thumbs/07.jpg" alt="" /></a>
          <h2>Mauris id tellus arcu</h2>
          <p>Nunc blandit nisi ligula magna sodales lectus elementum non. Integer id venenatis velit.</p>
        </article>
        <article className="thumb">
          <a href="images/fulls/08.jpg" className="image"><img src="images/thumbs/08.jpg" alt="" /></a>
          <h2>Nunc vehicula id nulla</h2>
          <p>Nunc blandit nisi ligula magna sodales lectus elementum non. Integer id venenatis velit.</p>
        </article>
        <article className="thumb">
          <a href="images/fulls/09.jpg" className="image"><img src="images/thumbs/09.jpg" alt="" /></a>
          <h2>Neque et faucibus viverra</h2>
          <p>Nunc blandit nisi ligula magna sodales lectus elementum non. Integer id venenatis velit.</p>
        </article>
        <article className="thumb">
          <a href="images/fulls/10.jpg" className="image"><img src="images/thumbs/10.jpg" alt="" /></a>
          <h2>Mattis ante fermentum</h2>
          <p>Nunc blandit nisi ligula magna sodales lectus elementum non. Integer id venenatis velit.</p>
        </article>
        <article className="thumb">
          <a href="images/fulls/11.jpg" className="image"><img src="images/thumbs/11.jpg" alt="" /></a>
          <h2>Sed ac elementum arcu</h2>
          <p>Nunc blandit nisi ligula magna sodales lectus elementum non. Integer id venenatis velit.</p>
        </article>
        <article className="thumb">
          <a href="images/fulls/12.jpg" className="image"><img src="images/thumbs/12.jpg" alt="" /></a>
          <h2>Vehicula id nulla dignissim</h2>
          <p>Nunc blandit nisi ligula magna sodales lectus elementum non. Integer id venenatis velit.</p>
        </article>
      </div>
      <footer id="footer" className="panel">
        <div className="inner split">
          <div>
            <section>
              <h2>Magna feugiat sed adipiscing</h2>
              <p>Nulla consequat, ex ut suscipit rutrum, mi dolor tincidunt erat, et scelerisque turpis ipsum eget quis orci mattis aliquet. Maecenas fringilla et ante at lorem et ipsum. Dolor nulla eu bibendum sapien. Donec non pharetra dui. Nulla consequat, ex ut suscipit rutrum, mi dolor tincidunt erat, et scelerisque turpis ipsum.</p>
            </section>
            <section>
              <h2>Follow me on ...</h2>
              <ul className="icons">
                <li><a href="#" className="icon brands fa-twitter"><span className="label">Twitter</span></a></li>
                <li><a href="#" className="icon brands fa-facebook-f"><span className="label">Facebook</span></a></li>
                <li><a href="#" className="icon brands fa-instagram"><span className="label">Instagram</span></a></li>
                <li><a href="#" className="icon brands fa-github"><span className="label">GitHub</span></a></li>
                <li><a href="#" className="icon brands fa-dribbble"><span className="label">Dribbble</span></a></li>
                <li><a href="#" className="icon brands fa-linkedin-in"><span className="label">LinkedIn</span></a></li>
              </ul>
            </section>
            <p className="copyright">
              &copy; Unttled. Design: <a href="http://html5up.net">HTML5 UP</a>.
								</p>
          </div>
          <div>
            <section>
              <h2>Get in touch</h2>
              <form method="post" action="#">
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
    </div>
  );
}

export default App;
