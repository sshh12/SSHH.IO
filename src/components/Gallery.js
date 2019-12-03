import React, { useState } from 'react';

function Gallery({ items, search, sorts }) {
  let hasSorts = (sorts.length > 0);
  let [sort, setSort] = useState(sorts[0]);
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
        {hasSorts && <ul class="actions small" style={{marginTop: '27px'}}>
          {sorts.map((st, i) => <li key={st.name} style={{margin: 'auto'}}>
            <a onClick={() => setSort(sorts[i])}
              class={`button small${st.name == sort.name ? ' primary': ''}`}>{st.name}</a></li>)}
        </ul>}
      </div>
      <div id="main">
        {items.map(item =>
          <article key={item.title} className="thumb">
            <a href={item.img} className="image"><img src={item.img} alt="" /></a>
            <h2 style={{ fontWeight: '700' }}>{hasSorts ? sort.title(item) : item.title}</h2>
            <p>{item.desc}</p>
            {item.descs.length > 0 && <hr />}
            {item.descs.length > 0 && <ul>{item.descs.map(text => <li key={text}>{text}</li>)}</ul>}
          </article>)}
      </div>
    </div>
  );
}

export default Gallery;