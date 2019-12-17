import React, { useState } from 'react';
import './CodeGallery.scss';

function CodeGallery({ items, search, sorts }) {
  return (
    <div class="container">
      <div class="page-header">
        <h1>Shrivu Shankar</h1>
        <p class="lead">A coder, hacker, and AI doer <a href="https://www.utexas.edu/">@ UT CS</a>.</p>
      </div>
      <div class="input-group searchbar">
        <input id="search" class="form-control form-control-lg" type="text" placeholder="What..." />
        <div class="input-group-append">
          <div class="input-group-text">?</div>
        </div>
      </div>
      <div class="btn-menu">
        <div class="btn-group">
          <button type="button" class="btn color-a"><i class="far fa-calendar-alt"></i></button>
          <button type="button" class="btn color-b"><i class="fas fa-trophy"></i></button>
          <button type="button" class="btn color-c"><i class="fas fa-pen-fancy"></i></button>
          <button type="button" class="btn color-d"><i class="fas fa-object-group"></i></button>
        </div>
      </div>
      <div id="sort-msg">
        <span></span>
      </div>
      <div id="timeline" class="timeline-a">
        <div id="timeline-container">
        </div>
      </div>
    </div>
  );
  // let hasSorts = (sorts && sorts.length > 0);
  // let [sort, setSort] = useState(sorts && sorts[0]);
  // let [query, setQuery] = useState('');
  // items = items.concat();
  // if(hasSorts) {
  //   items = items.sort(sort.sort);
  // }
  // if(query.length > 0) {
  //   items = items.filter(item => item.repr.includes(query.toLocaleLowerCase()));
  // }
  // return (
  //   <div style={{ textAlign: 'left' }}>
  //     <header id="header">
  //       <h1>Code</h1>
  //       <p>Codin.</p>
  //     </header>
  //     <div className="code-header">
  //       <input onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search"/>
  //       <span>Sort by: {sorts.map((st, i) =><a onClick={() => setSort(sorts[i])}>{st.name}&nbsp;</a>)}</span>
  //     </div>
  //     <br /><br />
  //     {items.map(item =>
  //       <div className="code-item" key={item.title}>
  //         <div>
  //           <h3>{hasSorts ? sort.title(item) : item.title}</h3>
  //           <p>{item.desc}</p>
  //           <div className="row" style={{marginTop: '5px'}}>
  //             {item.meta.github && <a className="link-icon" href={item.meta.github} target="_blank"><i className="fab fa-github"></i></a>}
  //             {item.meta.url && <a className="link-icon" href={item.meta.url} target="_blank"><i className="fas fa-link"></i></a>}
  //             {item.meta.article && <a className="link-icon" href={item.meta.article} target="_blank"><i className="fas fa-book"></i></a>}
  //           </div>
  //         </div>
  //         <div style={{width: '18em', marginTop: '10px'}}>
  //           <img src={item.img} />
  //         </div>
  //       </div>
  //     )}
  //     <footer id="footer" style={{left: '10px', bottom: '0', position: 'relative'}}>
  //       <LinkIcons />
  //     </footer>
  //   </div>
  // );
}

export default CodeGallery;