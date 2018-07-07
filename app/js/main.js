
$(() => {

  let years = {}

  projects.sort((a, b) => {
    return new Date(b.start).getTime() - new Date(a.start).getTime()
  })

  for(let project of projects) {

    let curYear = new Date(project.start).getFullYear()

    if(!years[curYear]) {

      years[curYear] = []

    }

    years[curYear].push(project);

  }

  let html = '';

  Object.keys(years).sort().reverse().forEach((year) => {

    html += `<section class="year"><h3>${year}</h3>`

    for(let project of years[year]) {

      html += `
        <section>
          <ul>
          <li>
            <b>${project.title}</b> <hr>
            ${project.tagline}
          </li>
          </ul>
        </section>`

    }

    html += '</section>'

  });

  $('#timeline-container').append(html);

})
