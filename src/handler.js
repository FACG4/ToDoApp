const fs = require('fs');
const bcrypt = require("bcrypt");
const path = require('path');
const post = require('./database/queries/post.js');
// const getData = require('../database/queries/get.js');
const queryString = require('querystring');
const contentType = {
  html: 'text/html',
  css: 'text/css',
  jpg: 'image/jpg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  ico: 'image/ico',
  js: 'text/javascript'
}

const serveFiles = (endpoint, response) => {
  console.log(endpoint);
  const filePath = path.join(__dirname, '..', 'public', endpoint);
  const fileExtention = endpoint.split('.')[1];
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, 'Content-Type:text/html');
      response.end('<h1>Sorry, there was a problem loading the homepage</h1>');
      console.log('asdgsdagdsas', error);
    }

    response.writeHead(200, {
      'Content-Type': `${contentType[fileExtention]}`
    });
    response.end(file);
  });
}

const insertUserData = (request, response) => {
  let data = '';
  request.on('data', (chunk) => {
    data += chunk;
  });
  request.on('end', () => {

    const objectData = queryString.parse(data);
    const passwordd = objectData.password;
    const username = objectData.username;
    const bio = objectData.bio;

    if (passwordd.length > 0 || username.length > 0 || bio.length > 0) {

      var salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(passwordd, salt);

      post.postUser(username, bio, passwordHash,2, (err, res) => {
        if (err) {
          console.log(err);
          response.writeHead(500, {
            'Content-Type': 'text/html'
          });
          response.end("<h1>Sorry, problem in signing up!</h1>")
        } else {
          response.writeHead(302, {
            'Location': '/'
          });
          response.end("Success signed up, cheeeeeeeers :)")

        }
      });
    } else {
      response.end(500, {
        'Content-Type': "text/html"
      });
      response.end("<h1>There is error data, check your inputs!</h1>");
    }
  })
}


module.exports = {
  serveFiles,
  insertUserData
};
