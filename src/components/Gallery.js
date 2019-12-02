import React from 'react';

function Gallery({ items }) {
  console.log(items.map(item => item.descs));
  return (
    <div id="main">
      {items.map(item => 
        <article key={item.title} className="thumb">
          <a href={item.img} className="image"><img src={item.img} alt="" /></a>
          <h2 style={{fontWeight: '700'}}>{item.title}</h2>
          <p>{item.desc}</p>
          {item.descs.length > 0 && <hr/>}
          {item.descs.length > 0 && <ul>{item.descs.map(text => <li key={text}>{text}</li>)}</ul>}
        </article>)}
    </div>
  );
}

export default Gallery;