var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
const url = 'http://localhost:5000';
// NOTE: Can ONLY use http **(no https)** for this; feel free to drop a PR if you find a fast way around this

xhr.open("GET", url + "/scrape?URL=https://www.nasa.gov/multimedia/imagegallery/iotd.html");
xhr.send();
xhr.onreadystatechange=(e) => {
  console.log(xhr.responseText)
}
