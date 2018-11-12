const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000 // Heroku or local
var app = express();

app
  // NOTE: Use the below for fancy display methods for the rest of the application
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .use((req, res, next) => { // CORS headers
      res.append('Access-Control-Allow-Origin', ['*']);
      res.append('Access-Control-Allow-Methods', 'GET');
      res.append('Access-Control-Allow-Headers', 'Content-Type');
      next();
  })
  .get('/scrape', function (req, res) { // Stands for `request` and `response`
      // ex. dynamic-page-retrieval.herokuapp.com/scrape?URL=https://www.nasa.gov/multimedia/imagegallery/iotd.html
      var parameter_URL = req.query.URL; // 'URL' is the parameter in the page location (after '?URL=')

      puppeteer
        .launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
        .then(browser => {
          return browser.newPage();
        })
        .then(page => {
          return page.goto(parameter_URL).then(() => {
            return page.content();
          })
        })
        .then(() => {
          if (page) {
            // NOTE: If this doesn't fix the memory leak problem, these resources may help:
            // https://github.com/GoogleChrome/puppeteer/issues/615
            // https://github.com/GoogleChrome/puppeteer/issues/1047
            // https://docs.browserless.io/blog/2018/06/04/puppeteer-best-practices.html
            // https://github.com/GoogleChrome/puppeteer/issues/1345#issuecomment-345138085
            // https://github.com/GoogleChrome/puppeteer/issues/1825
            // https://github.com/GoogleChrome/puppeteer/issues/851
            page.close().then(() => browser.close())
          }
        })
        .then(html => {
          var obj = { html : html };
          res.writeHead(200, {"Content-Type": "application/json"}); // Success code
          res.write(JSON.stringify(obj));
          res.end();
        })
        .catch(err => {
          console.error(err);

          var obj = { err : err };
          res.writeHead(404, {"Content-Type": "application/json"}); // Error code
          res.write(JSON.stringify(obj));
          res.end();
        });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`)) // localhost:5000
