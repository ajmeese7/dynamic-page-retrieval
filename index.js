const puppeteer = require('puppeteer')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var app = express()

app
  // NOTE: Use this section if you want to make the site fancy as well as retrieve code
  /*.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))*/
  .get('/scrape', function (req, res) {
      var url = require('url');
      var parameter_URL = req.query.URL; // 'URL' is the parameter in the page location (after the '?')

      puppeteer
        .launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
        .then(function(browser) {
          return browser.newPage();
        })
        .then(function(page) {
          return page.goto(parameter_URL).then(function() {
            return page.content();
          });
        })
        .then(function(html) {
          console.log(html);
        })
        .catch(function(err) {
          console.error(err);
        });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`)) // localhost:5000
