const express = require('express');
const path = require('path');
const auth = require('basic-auth');
const mailer = require('nodemailer');
const PORT = process.env.PORT || 5000;
const RESUME_URL = process.env.RESUME_URL || 'https://google.com';
const RESUME_PASS = process.env.RESUME_PASS || 'password';
const GMAIL_USER = process.env.GMAIL_USER || 'test@gmail.com';
const GMAIL_PASS = process.env.GMAIL_PASS || 'password';

let app = express();
app.use(express.urlencoded());

let sendShrivuEmail = (content) => {
  let smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS
    }
  });
  let mail = {
    from: `SSHH.IO <${GMAIL_USER}>`,
    to: "shrivu1122@gmail.com",
    subject: "SSHH.IO Notification",
    text: content,
    html: content
  }
  smtpTransport.sendMail(mail, (err, resp) => {
    smtpTransport.close();
  });
};

app.use(express.static(path.join(__dirname, 'build')));

app.get('/resume', (req, res) => {
  let user = auth(req);
  if (!user || user.pass != RESUME_PASS) {
    res.set('WWW-Authenticate', 'Basic realm="example"')
    res.status(401).send();
  } else {
    res.redirect(RESUME_URL);
  }
});

let reactBuild = path.join(__dirname, 'build', 'index.html');

app.get('/', (req, res) => res.sendFile(reactBuild));

app.get('/code', (req, res) => res.sendFile(reactBuild));
app.get('/code/:ident', (req, res) => {
  sendShrivuEmail('Code viewed w/ident: ' + req.params.ident);
  res.sendFile(reactBuild);
});

app.get('/photos', (req, res) => res.sendFile(reactBuild));

app.post('/form', (req, res) => {
  if (req.body.name.length > 1 && req.body.email.includes('@')) {
    sendShrivuEmail(JSON.stringify(req.body, 2));
  }
  res.redirect('/?formsubmitted');
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
