
function sortByTime() {

  projects.sort((a, b) => {
    return new Date(b.start).getTime() - new Date(a.start).getTime()
  })

  let prevYear = null
  let html = ''

  for(let project of projects) {

    let curYear = new Date(project.start).getFullYear()

    if(curYear !== prevYear) {

      if(prevYear != null) { html += '</section>' }

      html += `<section class="year"><h3>${curYear}</h3>`

      prevYear = curYear

    }

    html += getProjectHTML(project)

  }

  $('#sort-msg').html('Viewing Chronologically')
  $('#timeline-container').html(html)

}

function sortByCoolness() {

  projects.sort((a, b) => {
    return b.coolness - a.coolness
  })

  let prevCool = null
  let html = ''

  for(let project of projects) {

    let curCool = project.coolness

    if(curCool !== prevCool) {

      if(prevCool != null) { html += '</section>' }

      html += `<section class="year"><h3>${curCool}</h3>`

      prevCool = curCool

    }

    html += getProjectHTML(project)

  }

  $('#sort-msg').html('Viewing By Coolness')
  $('#timeline-container').html(html)

}

function sortByTags() {

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

      if(used.includes(project.title) || !project.tags.split(' ').includes(tag)) {
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

function sortByLanguage() {

  projects.sort((a, b) => {
    let cmp = b.language.localeCompare(a.language)
    return cmp === 0 ? b.coolness - a.coolness : cmp
  })

  let prevLang = null
  let html = ''

  for(let project of projects) {

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

function getProjectHTML(project) {

  return `
    <section>
      <ul>
      <li>
        <b>${project.title}</b> <hr>
        ${project.tagline}
      </li>
      </ul>
    </section><br>`

}

$(() => {

  sortByTime()

  $("#search").keyup((event) => {
    console.log($("#search").val())
  })

})
