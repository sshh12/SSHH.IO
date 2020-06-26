import React from 'react'
import CodeGallery from './components/CodeGallery'
import Index from './components/Index'
import Projects from './projects'
import Photos from './photos'
import './App.css'

const Nanobar = require('nanobar')
let nanobar = new Nanobar({ id: 'nanobar' })
document.getElementById('nanobar').className = 'nanobar nanobar-a'

function makeProjectRepr(project) {
  let repr = Object.values(project).join('')
  if (project.hack) {
    repr += ' greyhat whitehat ethical hacking security'
  }
  if (project.github) {
    repr += ' github open-source'
  }
  if (project.url) {
    repr += ' online webpage linked'
  }
  if (project.team) {
    repr += ' team' + project.team
  }
  if (project.wip) {
    repr += ' wip todo inprogress'
  }
  if (project.private) {
    repr += ' private'
  } else {
    repr += 'complete'
  }
  if (/\bML\b/.test(project.tags)) {
    repr += ' machine learning'
  }
  if (/\bRL\b/.test(project.tags)) {
    repr += ' reinforcement learning'
  }
  if (/\bNLP\b/.test(project.tags)) {
    repr += ' natural language processing'
  }
  if (/\bCV\b/.test(project.tags)) {
    repr += ' computer vision'
  }
  repr = repr.toLocaleLowerCase()
  return repr
}

function makePhotoRepr(photo) {
  let repr = Object.values(photo).join('')
  repr = repr.toLocaleLowerCase()
  return repr
}

class App extends React.Component {
  componentDidMount() {
    console.log('Projects: ', Projects)
    console.log('Photos: ', Photos)
    window.setTimeout(function () {
      document.querySelector('body').classList.remove('is-preload')
    }, 100)
    window.addEventListener('scroll', (event) => {
      let maxScroll = document.querySelector('body').scrollHeight - document.body.offsetHeight
      nanobar.go(Math.min(99.9, (window.scrollY / maxScroll) * 100))
    })
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
      }
    })
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
    ]
    return <CodeGallery search={true} items={projects} sorts={sorts} />
  }

  renderPhotos() {
    let photos = Photos.map((photo) => {
      let thumb = photo.img.replace(/w(\d+)-h(\d+)-/, (match, w, h) => {
        let scale = Math.max(w, h) / 500
        w = Math.floor(w / scale)
        h = Math.floor(h / scale)
        return `w${w}-h${h}-`
      })
      return {
        title: '',
        desc: photo.domain,
        descs: [],
        img: photo.img,
        thumb: thumb,
        repr: makePhotoRepr(photo),
        meta: photo,
      }
    })
    photos.sort((a, b) => Math.random() - 0.5)
    return <CodeGallery search={true} items={photos} />
  }

  renderIndex() {
    return <Index />
  }

  render() {
    let path = window.location.pathname
    let view
    if (path.startsWith('/code')) {
      view = this.renderProjects()
      document.querySelector('html').classList.add('code-view')
      document.querySelector('html').classList.remove('index-view')
    } else {
      view = this.renderIndex()
      document.querySelector('html').classList.add('index-view')
      document.querySelector('html').classList.remove('code-view')
      let int = setInterval(() => {
        if (window.slideShow) {
          window.slideShow()
          clearInterval(int)
        }
      }, 100)
    }
    return (
      <div className="App" id="wrapper">
        {view}
      </div>
    )
  }
}

export default App
