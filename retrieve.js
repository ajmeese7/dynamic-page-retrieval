var scraperjs = require('scraperjs');

function scrape(url) {
  scraperjs.DynamicScraper.create(url)
  	.scrape(function($) {
  		return $("html").map(function() {
  			return $(this);
  		}).get();
  	})
  	.then(function(html) {
  		console.log(html);
  	})
}

scrape("https://www.nasa.gov/multimedia/imagegallery/iotd.html");

/*const jsdom = require("jsdom");
const { JSDOM } = jsdom;
"jsdom": "12.0.0"

/*function scrape(url) {
  const dom = new JSDOM(``, {
    url: url
  });
  const document = dom.window.document;
  const html = document.querySelector("html");
  console.log(html);
}

scrape("https://www.nasa.gov/multimedia/imagegallery/iotd.html");
*/

/*const dom = new JSDOM(
  `<p>Hello
    <img src="foo.jpg">
  </p>`,
  { includeNodeLocations: true }
);

const document = dom.window.document;
const pEl = document.querySelector("p");
const textNode = pEl.firstChild;
const imgEl = document.querySelector("img");

dom.serialize();

console.log(pEl);*/

/*
var options = "";

JSDOM.fromURL("https://www.nasa.gov/multimedia/imagegallery/iotd.html", options).then(dom => {
  setTimeout(log, 5000);

  function log() {
    console.log(dom.serialize());
  }
});*/

/*
const window = (new JSDOM(``, { pretendToBeVisual: true })).window;

window.requestAnimationFrame(timestamp => {
  console.log(timestamp > 0);
});
*/
