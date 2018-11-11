const puppeteer = require('puppeteer')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000 // Heroku or local
var app = express()

app
  // NOTE: Use the below for fancy display methods for the rest of the application
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/scrape', function (req, res) { // Stands for `request` and `response`
      // ex. dynamic-page-retrieval.herokuapp.com/scrape?URL=https://www.nasa.gov/multimedia/imagegallery/iotd.html
      var parameter_URL = req.query.URL; // 'URL' is the parameter in the page location (after '?URL=')

      puppeteer
        .launch({args: ['--no-sandbox', '--disable-setuid-sandbox']}) // TODO: Check the security reprecussions of doing this
        .then(function(browser) {
          return browser.newPage();
        })
        .then(function(page) {
          return page.goto(parameter_URL).then(function() {
            return page.content();
          });
        })
        .then(function(html) {
          // IDEA: Use express to respond to requests?
          var obj = { html : html };
          res.send(JSON.stringify(obj));
        })
        .catch(function(err) {
          var obj = { err : err };
          res.send(JSON.stringify(obj));
        });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`)) // localhost:5000
