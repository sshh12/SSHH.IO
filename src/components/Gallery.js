import React from 'react';

function Gallery({ items }) {
  return (
    <div id="main">
      {items.map(item => 
        <article key={item.title} className="thumb">
          <a href={item.img} className="image"><img src={item.img} alt="" /></a>
          <h2 style={{fontWeight: '700'}}>{item.title}</h2>
          <p>{item.desc}</p>
        </article>)}
    </div>
  );
}

export default Gallery;