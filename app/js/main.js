
$(() => {

  for(let project of projects) {

    $('#timeline-container').append(`<section class="year">
      <h3>${new Date(project.start).getFullYear()}</h3>
      <section>
        <ul>
        <li>
          <b>${project.title}</b> <hr>
          ${project.tagline}
        </li>
        </ul>
      </section>
    </section>`)

  }

})
