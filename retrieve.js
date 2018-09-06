const jsdom = require("jsdom");
const { JSDOM } = jsdom;

/*
function scrape(url) {
  const dom = new JSDOM(``, {
    url: url
  });
  const document = dom.window.document;
  const html = document.querySelector("body");
  console.log(html);
}

scrape("https://www.nasa.gov/multimedia/imagegallery/iotd.html");
*/

/*
const dom = new JSDOM(
  `<p>Hello
    <img src="foo.jpg">
  </p>`,
  { includeNodeLocations: true }
);

const document = dom.window.document;
const pEl = document.querySelector("p");
dom.serialize();

console.log(pEl.innerHTML);*/


var options = "";

JSDOM.fromURL("https://www.nasa.gov/multimedia/imagegallery/iotd.html", options).then(dom => {
  function log() {
    console.log(dom.serialize());
  }
});

/*
const window = (new JSDOM(``, { pretendToBeVisual: true })).window;

window.requestAnimationFrame(timestamp => {
  console.log(timestamp > 0);
});
*/
