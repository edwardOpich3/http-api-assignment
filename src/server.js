const http = require('http');
const url = require('url');
// const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const apiHandler = require('./apiResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Handle a GET request, returning the appropriate data
const handleGet = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/') {
    htmlHandler.getIndex(request, response);
  } else if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (request.headers.accept === 'application/json') {
    apiHandler.getJSON(request, response, parsedUrl);
  } else if (request.headers.accept === 'text/xml') {
    apiHandler.getXML(request, response, parsedUrl);
  } else {
    apiHandler.getJSON(request, response, parsedUrl);
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url, true);

  handleGet(request, response, parsedUrl);
};

http.createServer(onRequest).listen(port);

console.log('Listening on localhost:3000...');
