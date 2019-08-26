const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

let app = express();

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'projects.html')))
app.get('/projects', (req, res) => res.sendFile(path.join(__dirname, 'public', 'projects.html')))
app.get('/code', (req, res) => res.sendFile(path.join(__dirname, 'public', 'projects.html')))

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
