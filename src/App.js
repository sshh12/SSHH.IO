import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Projects from './projects';
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

class App extends React.Component {

  componentDidMount() {
    console.log(Projects);
  }

  render() {
    let projects = Projects.map(project => {
      return {
        title: project.title,
        desc: project.tagline,
        descs: project.desc || [],
        img: project.thumb || '/images/no-pic.png',
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
    return (
      <div className="App" id="wrapper">
        <Header />
        <Gallery search={true} items={projects} sorts={sorts} />
        <Footer />
      </div>
    );
  }

}

export default App;
