import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Projects from './projects';
import './App.css';

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
        img: project.thumb || '/images/no-pic.png'
      };
    });
    return (
      <div className="App" id="wrapper">
        <Header />
        <Gallery items={projects} />
        <Footer />
      </div>
    );
  }

}

export default App;
