const express = require('express')
const path = require('path')
const auth = require('basic-auth')
const PORT = process.env.PORT || 5000
const RESUME_URL = process.env.RESUME_URL || 'https://google.com'
const RESUME_PASS = process.env.RESUME_PASS || 'password'

let app = express();

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'projects.html')))
app.get('/projects', (req, res) => res.sendFile(path.join(__dirname, 'public', 'projects.html')))
app.get('/code', (req, res) => res.sendFile(path.join(__dirname, 'public', 'projects.html')))

app.get('/resume', (req, res) => {
  let user = auth(req);
  if (!user || user.pass != RESUME_PASS) {
    res.set('WWW-Authenticate', 'Basic realm="example"')
    res.status(401).send();
  } else {
    res.redirect(RESUME_URL);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})