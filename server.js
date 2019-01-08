const express =  require('express');
const hbs = require('hbs');
const fs = require('fs');

// Port setting for heroku
const port = process.env.PORT || 3000;


var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view-engine','hbs');

app.use(express.static(__dirname + '/public'));

// Middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;
  fs.appendFile('Server.log', log + '\n', (err) => {
    if(err){
      console.log(err);
    }
  });
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs',{
//     sampleMsg:'Site is under maintenance'
//   });
// });

hbs.registerHelper('getYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) =>{
  // res.send('<h1>Hello Express !</h1>');
  res.render('home.hbs', {
    pageTitle:'Home Page',
    welcomeMsg:'Welcome to MyWebsite !'
  });
});

app.get('/projects', (req, res) =>{
  res.render('projects.hbs', {
    pageTitle:'Project'
  });
});

app.get('/about', (req, res) => {
  // res.send('<h1>About Page</h1>');
  res.render('about.hbs', {
    pageTitle:'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    message:'Bad Request',
    solution:'try after sometime'
  })
});

app.listen(port, () => {
  console.log(`Server is up on port:${port}`);
});
