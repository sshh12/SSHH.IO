const express = require('express');
const path = require('path');
const auth = require('basic-auth');
const PORT = process.env.PORT || 5000;

let app = express();
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/resume', (req, res) => res.redirect('https://forms.gle/m7FMe8beVMH5Z33d9'));

let reactBuild = path.join(__dirname, 'build', 'index.html');

app.get('/', (req, res) => res.sendFile(reactBuild));
app.get('/code', (req, res) => res.sendFile(reactBuild));
app.get('/code/:ident', (req, res) => res.sendFile(reactBuild));
app.get('/photos', (req, res) => res.sendFile(reactBuild));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
