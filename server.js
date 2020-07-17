const express = require('express');
const path = require('path');

let app = express();
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'build')));

let reactBuild = path.join(__dirname, 'build', 'index.html');

app.get('/', (req, res) => res.sendFile(reactBuild));
app.get('/code', (req, res) => res.sendFile(reactBuild));
app.get('/code/:ident', (req, res) => res.sendFile(reactBuild));
app.get('/resume', (req, res) => res.redirect('https://forms.gle/m7FMe8beVMH5Z33d9'));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on ${PORT}`);
});
