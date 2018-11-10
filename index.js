var webdriver = require('selenium-webdriver');
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var app = express()
var By = webdriver.By;

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/scrape', function (req, res) {
      var url = require('url');
      var parameter_URL = req.query.URL; // 'URL' is the parameter in the page location (after the '?')

      console.log("URL parameter is... " + parameter_URL);

      // TODO: Test if it actually works with JS content (the main goal of the project)
      var phantomjs = require('phantomjs-prebuilt')
      var webdriverio = require('webdriverio')
      var wdOpts = { desiredCapabilities: { browserName: 'phantomjs' } }

      phantomjs.run('--webdriver=4444').then(program => {
        webdriverio.remote(wdOpts).init()
          .url(parameter_URL)
          .getTitle().then(title => {
            console.log(page.content)
            program.kill() // quits PhantomJS
          })
      })

      /*var driver = new webdriver.Builder()
          .forBrowser('phantomjs')
          .build();
      driver.get('http://www.google.com/ncr');
      driver.findElement(By.name('q')).sendKeys('webdriver');
      driver.findElement(By.name('btnG')).click();
      driver.wait(function() {
          return driver.getTitle().then(function(title) {
              console.log(title);
              return title === 'webdriver - Google Search';
          });
      }, 5000).then(function() {
          res.status(200).send('Done');
      }, function(error) {
          res.status(200).send(error);
      });
      driver.quit();*/
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
