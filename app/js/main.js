
for(let project of projects) {

  let repr = Object.values(project).join('')
  if(project.hack) { repr += 'greyhat whitehat ethical hacking security' }
  if(project.github) { repr += 'github open-source' }
  if(project.url) { repr += 'online webpage linked' }
  if(project.team) { repr += 'team' + project.team }
  if(project.wip) { repr += 'wip todo inprogress' }
  if(project.private) { repr += 'private' }
  else { repr += 'complete' }

  if(/\bML\b/.test(project.tags)) { repr += 'machine-learning' }
  if(/\bRL\b/.test(project.tags)) { repr += 'reinforcement-learning' }
  if(/\bNLP\b/.test(project.tags)) { repr += 'natural-language-processing' }
  if(/\bCV\b/.test(project.tags)) { repr += 'computer-vision' }

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

  console.log('%c Welcome to //SSHH.IO ', 'color: green; background: #222; font-size: 30px')
  console.log(projects);

}); /* semicolon or else google code break */
