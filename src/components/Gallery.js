import React, { useState } from 'react';

function Gallery({ items, search, sorts }) {
  let hasSorts = (sorts && sorts.length > 0);
  let [sort, setSort] = useState(sorts && sorts[0]);
  let [query, setQuery] = useState('');
  items = items.concat();
  if(hasSorts) {
    items = items.sort(sort.sort);
  }
  if(query.length > 0) {
    items = items.filter(item => item.repr.includes(query.toLocaleLowerCase()));
  }
  return (
    <div>
      <div>
        {search && 
          <input onChange={(e) => setQuery(e.target.value)}
            style={{fontWeight: '600'}} type="text" placeholder="Search..." />}
        {hasSorts && <ul className="actions small" style={{marginTop: '27px'}}>
          {sorts.map((st, i) => <li key={st.name} style={{margin: 'auto'}}>
            <a onClick={() => setSort(sorts[i])}
              className={`button small${st.name == sort.name ? ' primary': ''}`}>{st.name}</a></li>)}
        </ul>}
      </div>
      <div id="main">
        {items.map(item =>
          <article key={item.title + item.img} className="thumb">
            <a href={item.img} className="image"><img src={item.thumb} alt="" /></a>
            {item.title && <h2 style={{fontWeight: '700', textAlign: 'left'}}>
              {hasSorts ? sort.title(item) : item.title}
              <br/>
              {item.meta.hack && <span title="Ethical Hacking!" className="badge badge-danger">Hacking</span>}
              {item.meta.tiny && <span className="badge badge-info">Mini Project</span>}
              {item.meta.wip && <span title="Not yet complete" className="badge badge-warning">//TODO</span>}
              {item.meta.team && <span title="Team/Company Project" className="badge badge-success">{item.meta.team}</span>}
              {(item.meta.hack || item.meta.tiny || item.meta.wip || item.meta.team) && <br/>}
            </h2>}
            {item.desc && <p style={{float: 'left'}}>{item.desc}</p>}
            {item.descs.length > 0 && <br />}
            {item.descs.length > 0 && <ul style={{float: 'left', width: '100%'}}>
              {item.descs.map(text => <li style={{color: '#fff'}} key={text}>{text}</li>)}</ul>}
            {(item.meta.github || item.meta.url || item.meta.article) && <br/>}
            <div>
              {item.meta.github && <a className="link-icon" href={item.meta.github} target="_blank"><i className="fab fa-github"></i></a>}
              {item.meta.url && <a className="link-icon" href={item.meta.url} target="_blank"><i className="fas fa-link"></i></a>}
              {item.meta.article && <a className="link-icon" href={item.meta.article} target="_blank"><i className="fas fa-book"></i></a>}
            </div>
          </article>)}
      </div>
      <link rel="stylesheet" href="/assets/multiverse/css/main.css" />
    </div>
  );
}

export default Gallery;