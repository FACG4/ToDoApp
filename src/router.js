const http = require('http');
const fs = require('fs');
const pg = require('pg');
const handler = require('./handler');


const type = ['/css/style.css', '/js/dom_signup.js', '/js/dom_admin.js', '/js/fetch.js', '/js/pure_functions.js', '/js/dom_success_signup.js', '/js/dom_user_page.js', '/js/dom_login.js']

const router = (request, response) => {
  const { url } = request;

  if (url === '/') {
    handler.serveFiles('html/login.html', response);
  } else if (url === '/html/success_signup.html') {
    handler.serveFiles(url, response);
  }else if (url === '/html/signup.html') {
    handler.serveFiles(url, response);
  } else if (url === '/html/admin.html') {
    handler.serveFiles(url, response);
  } else if (url === '/html/user_page.html') {
    handler.serveFiles(url, response);
  } else if (url === '/insertUser' && request.method === "POST") {
    handler.insertUserData(request, response);
  } else if (type.includes(url)) {
    handler.serveFiles(url, response);
  } else if (url === '/admin' && request.method === "GET") {
    handler.admin(request, response);
  } else if (url === '/itemsForUser' && request.method === "GET") {
    handler.itemsForUser(request, response);
  } else if (url === '/getUserName' && request.method === "GET") {
    handler.getUserName(request, response);
  } else if (url === '/deleteUser' && request.method === "POST") {
    handler.deleteUsers(request, response);
  } else if (url === '/deleteItem' && request.method === "POST") {
    handler.deleteItem(request, response);
  } else if (url === '/addItem' && request.method === "POST") {
    handler.addItem(request, response);
  }else if (url === "/loginUser" && request.method === "POST") {
    handler.checkUserData(request, response);
  } else {
    response.writeHead(404, 'Content-Type:text/html');
    response.end('<h1>Page not found</h1>');
  }

};

module.exports = router;
