
function sortByTime() {

  window.currentSort = sortByTime

  $('#timeline').attr('class', 'timeline-a')
  $('#nanobar').attr('class', 'nanobar bar-a')

  projects.sort((a, b) => {
    return new Date(b.start).getTime() - new Date(a.start).getTime()
  })

  let prevYear = null
  let html = ''

  for(let project of projects) {

    if(project._hide) {
      continue
    }

    let curYear = new Date(project.start).getFullYear()

    if(curYear !== prevYear) {

      if(prevYear != null) { html += '</section>' }

      html += `<section class="year"><h3>${curYear}</h3>`

      prevYear = curYear

    }

    html += getProjectHTML(project)

  }

  $('#sort-msg').html('Viewing Chronologically 🕒')
  $('#timeline-container').html(html)

}

function sortByCoolness() {

  window.currentSort = sortByCoolness

  $('#timeline').attr('class', 'timeline-b')
  $('#nanobar').attr('class', 'nanobar bar-b')

  projects.sort((a, b) => {
    let cmp = b.coolness - a.coolness
    return cmp === 0 ? a.title.localeCompare(b.title) : cmp
  })

  let prevCool = null
  let html = ''

  for(let project of projects) {

    if(project._hide) {
      continue
    }

    let curCool = project.coolness

    if(curCool !== prevCool) {

      if(prevCool != null) { html += '</section>' }

      html += `<section class="year"><h3>${curCool}</h3>`

      prevCool = curCool

    }

    html += getProjectHTML(project)

  }

  $('#sort-msg').html('Viewing By Coolness 😎')
  $('#timeline-container').html(html)

}

function sortByLanguage() {

  window.currentSort = sortByLanguage

  $('#timeline').attr('class', 'timeline-c')
  $('#nanobar').attr('class', 'nanobar bar-c')

  projects.sort((a, b) => {
    let cmp = b.language.localeCompare(a.language)
    return cmp === 0 ? b.coolness - a.coolness : cmp
  })

  let prevLang = null
  let html = ''

  for(let project of projects) {

    if(project._hide) {
      continue
    }

    let curLang = project.language

    if(curLang !== prevLang) {

      if(prevLang != null) { html += '</section>' }

      html += `<section class="year"><h3>${curLang.split(' ').sort().join('<br>')}</h3>`

      prevLang = curLang

    }

    html += getProjectHTML(project)

  }

  $('#sort-msg').html('Grouped By Language')
  $('#timeline-container').html(html)

}

function sortByTags() {

  window.currentSort = sortByTags

  $('#timeline').attr('class', 'timeline-d')
  $('#nanobar').attr('class', 'nanobar bar-d')

  let allTags = {}

  for(let project of projects) {

    let tags = project.tags.split(' ')

    for(let tag of tags) {

      if(!allTags[tag]) {
        allTags[tag] = 0
      }
      allTags[tag]++

    }

  }

  let html = ''
  let used = []

  let sortTags = (a, b) => {
    let cmp = allTags[b] - allTags[a]
    return cmp === 0 ? a.length - b.length : cmp
  }

  Object.keys(allTags).sort(sortTags).forEach((tag) => {

    let first = true

    for(let project of projects) {

      if(project._hide || used.includes(project.title) || !project.tags.split(' ').includes(tag)) {
        continue
      }

      if(first) {

        if(used.length != 0) { html += '</section>' }

        html += `<section class="year"><h3>${tag}</h3>`

        first = false

      }

      html += getProjectHTML(project)

      used.push(project.title)

    }

  })

  $('#sort-msg').html('Grouped By Tags')
  $('#timeline-container').html(html)

}

function getProjectHTML(project) {

  let descHTML = '';
  if(project.desc) {
    descHTML = project.desc.map(d => `<li>${d}</li>`).join('');
  }

  return `
    <section id="project-${project._id}">
      <ul>
      <li class="project-item">
        <b>${project.title}</b>
        ${project.hack ? '<span title="Ethical Hacking!" class="badge badge-danger">Hacking</span>':''}
        ${project.tiny ? '<span class="badge badge-info">Mini Project</span>':''}
        ${project.wip ? '<span title="Not yet complete" class="badge badge-warning">//TODO</span>':''}
        ${project.team ? '<span title="Group Project" class="badge badge-success">' + project.team + '</span>':''}
        <br>
        <span class="small-date">${project.start}</span>
        <br>
        ${project.github ? '<a href="' + project.github + '" target="_blank"><i class="link-icon fab fa-github"></i></a>':''}
        ${project.url ? '<a href="' + project.url + '" target="_blank"><i class="link-icon fas fa-link"></i></a>':''}
        ${project.article ? '<a href="' + project.article + '" target="_blank"><i class="link-icon fas fa-book"></i></a>':''}
        ${project.private ? '<a href="javascript:alert(\'This project/repo is private. Fill free to contact me if you\\\'re interested in the source code.\')"><i class="link-icon fas fa-lock"></i></a>':''}
        <hr>
        ${project.tagline}
        <div class="desc" id="desc-${project._id}">
          ${project.desc ? '<hr><ul class="desc-list">' + descHTML + '</ul>':''}
          ${project.thumb ? '<hr><img class="desc-img" src="' + project.thumb + '" />':''}
        </div>
      </li>
      </ul>
    </section><br>`

}
