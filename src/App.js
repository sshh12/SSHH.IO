import React from 'react';
import CodeGallery from './components/CodeGallery';
import Index from './components/Index';
import Projects from './projects';
import './App.css';

const Nanobar = require('nanobar');
let nanobar = new Nanobar({ id: 'nanobar' });
document.getElementById('nanobar').className = 'nanobar nanobar-a';

function makeProjectRepr(project) {
  let repr = Object.values(project).join('');
  if (project.hack) {
    repr += ' greyhat whitehat ethical hacking security';
  }
  if (project.github) {
    repr += ' github open-source';
  }
  if (project.url) {
    repr += ' online webpage linked';
  }
  if (project.team) {
    repr += ' team' + project.team;
  }
  if (project.wip) {
    repr += ' wip todo inprogress';
  }
  if (project.private) {
    repr += ' private';
  } else {
    repr += 'complete';
  }
  if (/\bML\b/.test(project.tags)) {
    repr += ' machine learning';
  }
  if (/\bRL\b/.test(project.tags)) {
    repr += ' reinforcement learning';
  }
  if (/\bNLP\b/.test(project.tags)) {
    repr += ' natural language processing';
  }
  if (/\bCV\b/.test(project.tags)) {
    repr += ' computer vision';
  }
  repr = repr.toLocaleLowerCase();
  return repr;
}

class App extends React.Component {
  componentDidMount() {
    console.log('Projects: ', Projects);
    window.setTimeout(function () {
      document.querySelector('body').classList.remove('is-preload');
    }, 100);
    window.addEventListener('scroll', (event) => {
      let maxScroll = document.querySelector('body').scrollHeight - document.body.offsetHeight;
      nanobar.go(Math.min(99.9, (window.scrollY / maxScroll) * 100));
    });
  }

  renderProjects() {
    let projects = Projects.map((project) => {
      return {
        title: project.title,
        desc: project.tagline,
        descs: project.desc || [],
        img: project.thumb || '/images/no-pic.png',
        thumb: project.thumb || '/images/no-pic.png',
        date: new Date(project.start) || new Date(),
        repr: makeProjectRepr(project),
        meta: project,
      };
    });
    let sorts = [
      {
        name: 'Viewing Chronologically 🕒',
        sort: (a, b) => b.date.getTime() - a.date.getTime(),
        title: (item) => item.title,
        className: 'far fa-calendar-alt',
      },
      {
        name: 'Sorted By Language',
        sort: (a, b) => b.meta.language.localeCompare(a.meta.language),
        title: (item) => `${item.title} (${item.meta.language})`,
        className: 'fas fa-pen-fancy',
      },
      {
        name: 'Sorted By Domain',
        sort: (a, b) => a.meta.domain.localeCompare(b.meta.domain),
        title: (item) => `${item.title} (${item.meta.domain})`,
        className: 'fas fa-object-group',
      },
    ];
    return <CodeGallery items={projects} sorts={sorts} />;
  }

  renderIndex() {
    return <Index />;
  }

  render() {
    let path = window.location.pathname;
    let view;
    if (path.startsWith('/code')) {
      view = this.renderProjects();
      document.querySelector('html').classList.add('code-view');
      document.querySelector('html').classList.remove('index-view');
    } else {
      view = this.renderIndex();
      document.querySelector('html').classList.add('index-view');
      document.querySelector('html').classList.remove('code-view');
      let int = setInterval(() => {
        if (window.slideShow) {
          window.slideShow();
          clearInterval(int);
        }
      }, 100);
    }
    return (
      <div className="App" id="wrapper">
        {view}
      </div>
    );
  }
}

export default App;
