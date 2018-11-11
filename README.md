# dynamic-page-retrieval

The point of this project is to make web scraping easier for developers in any language.
This allows you to send a URL as a parameter to a Heroku application via a GET request
and receive the scraped HTML as a result. The most helpful part of this project is that
it returns the web page after it has been dynamically populated by JavaScript, so you
can scrape nearly any page.

## Usage

Simply send a GET request to `https://dynamic-page-retrieval.herokuapp.com` with a URL
parameter, which should be formatted like so: `?URL=https://www.google.com`.

So, the entire URL for your GET request, if you were going to use the pre-hosted Heroku
application, would be `https://dynamic-page-retrieval.herokuapp.com?URL=https://www.google.com`
if you wanted to scrape `https://www.google.com`.

An example of how to format this GET request in JavaScript:
```javascript
const Http = new XMLHttpRequest();
const url = "https://dynamic-page-retrieval.herokuapp.com?URL=https://www.google.com";
Http.open("GET", url);
Http.send();
Http.onreadystatechange=(e)=>{
  // Replace console.log() with what you need the HTML for,
  // or assign it to a global variable for use elsewhere
  console.log(Http.responseText)
}
```

## Set up your own

First, create a free [Heroku](signup.heroku.com) account. If you already have one, there is
no need to make a new one.

Next, make sure you have [Node.js and npm](https://nodejs.org/en/download/) installed locally.
In the creation of this project, I used Node v9.3.0 and npm v6.4.1, but it shouldn't matter
that much since you are just going to be deploying to Heroku. If you are going to run this
locally, then version will likely be more of a factor.

Clone this project to your machine and open a terminal in the folder. Enter the following
sequence of commands:

`heroku create`
`heroku buildpacks:add https://github.com/jontewks/puppeteer-heroku-buildpack`
`git push heroku master`
`heroku ps:scale web=1`
`heroku open`

And you should have a working copy of the project.

## Contributing

Feel free to open a PR for README additions of GET requests in other languages, making a pretty
homepage and displaying the information on the scraped page in a nicer format, better tests,
better error handling, etc.

### Ideas
- Make npm package where you just put in the URL and get back the scraped content
- Make similar projects in other languages (even though that was a bust before)
