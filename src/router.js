const http = require('http');
const fs = require('fs');
const pg = require('pg');
const handler = require('./handler');

const type = ['/css/style.css','/js/dom_signup.js']

const router = (request, response) => {
    const {url} = request;


    // first endpoint
    if (url === '/') {
      handler.serveFiles('html/signup.html', response);
    }




   //second endpoint
    else if (url === '/insertUser' && request.method === "POST") {
      handler.insertUserData(request, response);
    }


    else if (type.includes(url)) {
      handler.serveFiles(url, response);
    }



    else  {
      response.writeHead(404, 'Content-Type:text/html');
      response.end('<h1>Page not found</h1>');
    }
};

module.exports = router;
