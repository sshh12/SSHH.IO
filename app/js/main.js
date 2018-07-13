
for(let project of projects) {
  let repr = Object.values(project).join('').replace(/\W+/g, '').toLowerCase()
  project._repr = repr
  project._id = project.title.replace(/\W+/g, '')
  project._hide = false
}

$(() => {

  let nanobar = new Nanobar({id: 'nanobar'})

  $("#search").keyup((event) => {

    let query = $("#search").val()
    query = query.replace(/\W+/g, '').toLowerCase()

    for(let project of projects) {

      if(project._repr.includes(query)) {
        project._hide = false
      } else {
        project._hide = true
      }

    }

    currentSort()

  })

  $(window).scroll((event) => {
    let maxScroll = document.body.offsetHeight - window.innerHeight;
    nanobar.go(Math.min(100, window.scrollY / maxScroll * 100, 99))
  });

  sortByTime()

})
