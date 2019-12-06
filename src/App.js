import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Index from './components/Index';
import Projects from './projects';
import Photos from './photos';
import './App.css';

function makeProjectRepr(project) {
  let repr = Object.values(project).join('')
  if(project.hack) { repr += ' greyhat whitehat ethical hacking security' }
  if(project.github) { repr += ' github open-source' }
  if(project.url) { repr += ' online webpage linked' }
  if(project.team) { repr += ' team' + project.team }
  if(project.wip) { repr += ' wip todo inprogress' }
  if(project.private) { repr += ' private' }
  else { repr += 'complete' }
  if(/\bML\b/.test(project.tags)) { repr += ' machine learning' }
  if(/\bRL\b/.test(project.tags)) { repr += ' reinforcement learning' }
  if(/\bNLP\b/.test(project.tags)) { repr += ' natural language processing' }
  if(/\bCV\b/.test(project.tags)) { repr += ' computer vision' }
  repr = repr.toLocaleLowerCase();
  return repr;
}

function makePhotoRepr(photo) {
  let repr = Object.values(photo).join('')
  repr = repr.toLocaleLowerCase();
  return repr;
}

class App extends React.Component {

  componentDidMount() {
    console.log('Projects: ', Projects);
    console.log('Photos: ', Photos);
  }

  renderProjects() {
    let projects = Projects.map(project => {
      return {
        title: project.title,
        desc: project.tagline,
        descs: project.desc || [],
        img: project.thumb || '/images/no-pic.png',
        thumb: project.thumb || '/images/no-pic.png',
        date: new Date(project.start) || new Date(),
        repr: makeProjectRepr(project),
        meta: project
      };
    });
    let sorts = [
      {
        name: 'Time',
        sort: (a, b) => b.date.getTime() - a.date.getTime(),
        title: (item) => `${item.title} (${item.meta.start})`
      }, {
        name: 'Coolness',
        sort: (a, b) => b.meta.coolness - a.meta.coolness,
        title: (item) => `${item.title} (${item.meta.coolness}/10)`
      }, {
        name: 'Language',
        sort: (a, b) => b.meta.language.localeCompare(a.meta.language),
        title: (item) => `${item.title} (${item.meta.language})`
      }, {
        name: 'Domain',
        sort: (a, b) => a.meta.domain.localeCompare(b.meta.domain),
        title: (item) => `${item.title} (${item.meta.domain})`
      }
    ];
    return <Gallery search={true} items={projects} sorts={sorts} />;
  }

  renderPhotos() {
    let photos = Photos.map(photo => {
      let thumb = photo.img.replace(/w(\d+)-h(\d+)-/, (match, w, h) => {
        let scale = Math.max(w, h) / 500;
        w = Math.floor(w / scale);
        h = Math.floor(h / scale);
        return `w${w}-h${h}-`;
      });
      return {
        title: '',
        desc: photo.domain,
        descs: [],
        img: photo.img,
        thumb: thumb,
        repr: makePhotoRepr(photo),
        meta: photo
      };
    });
    photos.sort((a, b) => Math.random() - 0.5);
    return <Gallery search={true} items={photos}/>;
  }

  renderIndex() {
    return <Index />;
  }

  render() {
    let view;
    if(window.location.pathname.startsWith('/photos')) {
      view = this.renderPhotos();
    } else {
      view = this.renderProjects();
    }
    return (
      <div className="App" id="wrapper">
        <Header />
        {view}
        <Footer />
      </div>
    );
  }

}

export default App;
