
$(() => {

  sortByTags();

})

function sortByTime() {

  projects.sort((a, b) => {
    return new Date(b.start).getTime() - new Date(a.start).getTime()
  })

  let prevYear = null;
  let html = '';

  for(let project of projects) {

    let curYear = new Date(project.start).getFullYear()

    if(curYear !== prevYear) {

      if(prevYear != null) { html += '</section>' }

      html += `<section class="year"><h3>${curYear}</h3>`

      prevYear = curYear;

    }

    html += getProjectHTML(project)

  }

  $('#timeline-container').html(html);

}

function sortByCoolness() {

  projects.sort((a, b) => {
    return b.coolness - a.coolness
  })

  let prevCool = null;
  let html = '';

  for(let project of projects) {

    let curCool = project.coolness;

    if(curCool !== prevCool) {

      if(prevCool != null) { html += '</section>' }

      html += `<section class="year"><h3>${curCool}</h3>`

      prevCool = curCool;

    }

    html += getProjectHTML(project)

  }

  $('#timeline-container').html(html);

}



function sortByLanguage() {

  projects.sort((a, b) => {
    let cmp = b.language.localeCompare(a.language)
    return cmp === 0 ? b.coolness - a.coolness : cmp;
  })

  let prevLang = null;
  let html = '';

  for(let project of projects) {

    let curLang = project.language;

    if(curLang !== prevLang) {

      if(prevLang != null) { html += '</section>' }

      html += `<section class="year"><h3>${curLang.split(' ').sort().join('<br>')}</h3>`

      prevLang = curLang;

    }

    html += getProjectHTML(project)

  }

  $('#timeline-container').html(html);

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
