
for(let project of projects) {

  let repr = Object.values(project).join('')
  if(project.hack) { repr += 'greyhat whitehat ethical hacking' }
  if(project.github) { repr += 'github open-source' }
  if(project.url) { repr += 'online webpage linked' }
  if(project.wip) { repr += 'wip todo inprogress' }
  else { repr += 'complete' }

  project._repr = repr.replace(/\W+/g, '').toLowerCase()
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
