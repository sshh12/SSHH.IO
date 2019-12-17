import React, { useState } from 'react';
import './CodeGallery.scss';

function CodeGallery({ items, search, sorts }) {
  let [sort, setSort] = useState(sorts && sorts[0]);
  let [query, setQuery] = useState('');
  items = items.sort(sort.sort);
  if (query.length > 0) {
    items = items.filter(item => item.repr.includes(query.toLocaleLowerCase()));
  }
  return (
    <div class="container">
      <div class="page-header">
        <h1>Shrivu Shankar</h1>
        <p class="lead">A coder, hacker, and AI doer <a href="https://www.utexas.edu/">@ UT CS</a>.</p>
      </div>
      <div class="input-group searchbar">
        <input onChange={(e) => setQuery(e.target.value)}
          id="search" class="form-control form-control-lg" type="text" placeholder="Search" />
        <div class="input-group-append">
          <div class="input-group-text">?</div>
        </div>
      </div>
      <div class="btn-menu">
        <div class="btn-group">
          {sorts.map((sort, i) =>
            <button onClick={() => setSort(sorts[i])}
              type="button" class={`btn color-${'abcdef'.charAt(i)}`}><i class={sort.className}></i></button>
          )}
        </div>
      </div>
      <div id="sort-msg">
        <span>{sort.name}</span>
      </div>
      <br/>
      <div id="timeline" class="timeline-a">
        <div id="timeline-container">
          {items.map(item =>
            <section key={item.title} id={`project-${item.title}`}>
              <ul>
                <li className="project-item">
                  <b>{sort.title(item)}</b>
                  {item.meta.hack && <span title="Ethical Hacking!" class="badge badge-danger">Hacking</span>}
                  {item.meta.tiny && <span class="badge badge-info">Mini Project</span>}
                  {item.meta.wip && <span title="Not yet complete" class="badge badge-warning">{'//TODO'}</span>}
                  {item.meta.team && <span title="Team/Company Project" class="badge badge-success">{item.meta.team}</span>}
                  <br />
                  <span class="small-date">{item.meta.start}</span>
                  <br />
                  {item.meta.github && <a href={item.meta.github} target="_blank"><i class="link-icon2 fab fa-github"></i></a>}
                  {item.meta.url && <a href={item.meta.url} target="_blank"><i class="link-icon2 fas fa-link"></i></a>}
                  {item.meta.article && <a href={item.meta.article} target="_blank"><i class="link-icon2 fas fa-book"></i></a>}
                  {item.meta.private && <a href="#" onClick={() => alert('This project is private. Fill free to contact me if you\'re interested in the source code.')}><i class="link-icon2 fas fa-lock"></i></a>}
                  <hr />
                  {item.desc}
                  <div class="desc" id={`desc-${item.title}`}>
                    {item.meta.desc && [<hr />, <ul class="desc-list">{item.meta.desc.map(d => <li key={d}>{d}</li>)}</ul>]}
                    {item.img && [<hr />, <img class="desc-img" src={item.img} />]}
                  </div>
                </li>
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default CodeGallery;