const fs = require("fs");
const bcrypt = require("bcrypt");
const queryString = require("querystring");
const path = require("path");
const {
  parse
} = require('cookie');
const {
  sign,
  verify
} = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
require('env2')('../config.env');

const postQuery = require("./database/queries/post.js");
const getQuery = require("./database/queries/get.js");
const deleteQuery = require("./database/queries/delete.js");

const contentType = {
  html: "text/html",
  css: "text/css",
  jpg: "image/jpg",
  jpeg: "image/jpeg",
  png: "image/png",
  ico: "image/ico",
  js: "text/javascript"
};

const serveFiles = (endpoint, response) => {
  const filePath = path.join(__dirname, "..", "public", endpoint);
  console.log(endpoint);
  const fileExtention = endpoint.split(".")[1];
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, "Content-Type:text/html");
      response.end("<h1>Sorry, there was a problem loading the homepage</h1>");
    }
    response.writeHead(200, {
      "Content-Type": `${contentType[fileExtention]}`
    });
    response.end(file);
  });
};







const insertUserData = (request, response) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("end", () => {
    const objectData = queryString.parse(data);
    const passwordd = objectData.password;
    const username = objectData.username;
    const bio = objectData.bio;

    if (passwordd.length > 0 || username.length > 0 || bio.length > 0) {
      var salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(passwordd, salt);

      postQuery.postUser(username, bio, passwordHash, 2, (err, res) => {
        if (err) {
          response.writeHead(500, {
            "Content-Type": "text/html"
          });
          response.end("<h1>This name is already exists!</h1>")
        } else {
          response.writeHead(302, {
            Location: "/html/success_signup.html"
          });
          response.end();
        }
      });
    } else {
      response.end(500, {
        "Content-Type": "text/html"
      });
      response.end("<h1>There is error data, check your inputs!</h1>");
    }
  })
}
const admin = (request, response) => {

  getQuery.getUsersInfo((error, result) => {
    if (error) {
      console.log(error);
      response.writeHead(500, {
        "content-Type": "text/html"
      });
      response.end("<h1>Sorry, something wrong with getting users data!</h1>");
    } else {
      if (result) {
        response.writeHead(200, {
          'Content-Type': 'application/json'
        });
        response.end(JSON.stringify(result));
      } else {
        response.writeHead(200, {
          'Content-Type': 'application/json'
        });
        response.end();
      }
    }
  })
}

const itemsForUser = (request, response) => {
  const {
    jwt
  } = parse(request.headers.cookie);
  verify(jwt, process.env.SECRET_COOKIE, (err, jwt) => {
    if (err) {
      res.writeHead(
        401, {
          'Content-Type': 'text/plain'
        }
      );
      res.end("fail !");
    } else {
      getQuery.getListItemsForUser(jwt.id, (error, result) => {
        if (error) {
          response.writeHead(500, {
            'content-Type': 'text/html'
          });
          response.end("<h1>Sorry, something wrong with getting user list!</h1>")
        } else {
          response.writeHead(200, {
            'Content-Type': 'application/json'
          });
          response.end(JSON.stringify(result));
        }
      })
    }
  });
}

const getUserName = (request, response) => {
  const {
    jwt
  } = parse(request.headers.cookie);
  verify(jwt, process.env.SECRET_COOKIE, (err, jwt) => {
    if (err) {
      res.writeHead(
        401, {
          'Content-Type': 'text/plain'
        }
      );
      res.end("fail !");
    } else {
      response.writeHead(200, {
        'Content-Type': 'application/json'
      });
      response.end(JSON.stringify(jwt));
    }
  });
}

const deleteUsers = (request, response) => {
  const id = request.headers.id;
  deleteQuery.deleteUser(id, (error, result) => {
    if (error) {
      response.writeHead(500, {
        "Content-Type": "text/html"
      });
      response.end("<h1>Error in deleting this user</h1>");
    } else {
      response.writeHead(200, {
        "Content-Type": "application/json"
      });
      response.end();
    }
  });
};

const deleteItem = (request, response) => {
  const id = request.headers.id;
  deleteQuery.deleteItem(id, (error, result) => {
    if (error) {
      response.writeHead(500, {
        'Content-Type': 'text/html'
      })
      response.end("<h1>Error in deleting this item</h1>")
    } else {
      response.writeHead(200, {
        'Content-Type': 'application/json'
      });
      response.end();
    }
  });
}



const addItem = (request, response) => {
  let data = '';
  request.on('data', (chunk) => {
    data += chunk;
  });

  request.on('end', () => {
    const dataObj = JSON.parse(data);
    const item_body = dataObj.item;
    const user_id = dataObj.id;

    if (item_body.length > 0) {

      postQuery.postItem(item_body, true, user_id, (err, res) => {
        if (err) {
          response.writeHead(200, {
            'Content-Type': 'application/json'
          });
          response.end();
        } else {
          response.writeHead(200, {
            'Content-Type': 'application/json'
          });
          response.end()
        }
      });
    } else {
      response.writeHead(500, {
        'Content-Type': "text/html"
      });
      response.end("<h1>There is error data, check your inputs!</h1>");
    }
  });
}




const checkUserData = (request, response) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  console.log("Data: ", data);
  request.on("end", () => {

    const objectData = queryString.parse(data);

    const passwordd = objectData.password;
    const name = objectData.username;

    const role = objectData.role;
    const payload = {
      role: role
    };
    const secret = process.env.MY_SECRET;
    var token = jwt.sign(payload, secret);

    if (name.length > 0 || passwordd.length > 0) {
      getQuery.checkUsersInfo(name, (err, res) => {
        if (err) {
          response.writeHead(500, {
            "Content-Type": "text/html"
          });
          response.end("<h1>Error Login!</h1>")
        } else {

          if (res.length === 0) {
            response.writeHead(500, {
              "Content-Type": "text/html"
            });
            response.end("<h1>Wrong name!</h1>")
          } else {

            let dataFromDb = JSON.stringify(res);
            let objData = JSON.parse(dataFromDb);

            console.log(passwordd);
            bcrypt.compare(passwordd, objData[0].hashpassword, function(error, result) {
              if (error) {
                response.writeHead(500, {
                  "Content-Type": "text/html"
                });
                response.end("<h1>Wrong PassWord!</h1>")
              } else {
                if (result == true) {

                  const userData = {
                    id: objData[0].id,
                    username: objData[0].name,
                    user_role: objData[0].role,
                    bio: objData[0].bio
                  }
                  if (objData[0].role == 2) {

                    console.log(userData);
                    const cookie = sign(userData, process.env.SECRET_COOKIE);
                    response.writeHead(302, {
                      location: "/html/user_page.html",
                      'Set-Cookie': `jwt=${cookie}; HttpOnly`
                    });
                    response.end();

                  } else {
                    const cookie = sign(userData, process.env.SECRET_COOKIE);
                    response.writeHead(302, {
                      location: "/html/admin.html",
                      'Set-Cookie': `jwt=${cookie}; HttpOnly`
                    });
                    response.end();
                  }

                } else {
                  response.writeHead(500, {
                    "Content-Type": "text/html"
                  });
                  response.end("<h1>Wrong PassWord!</h1>")
                }
              }
            });
          }
          let dataFromDb = JSON.stringify(res);
          let objData = JSON.parse(dataFromDb);
          console.log(objData);

          bcrypt.compare(passwordd, objData[0].hashpassword, function(error, result) {
            if (error) {
              console.log(error);
              response.writeHead(500, {
                "Content-Type": "text/html"
              });
              response.end("<h1>Wrong PassWord!</h1>")
            } else {


              response.writeHead(302, {
                location: "/html/user_page.html",
                'Set-Cookie': `token=${token};httpOnly;max-age=9000`
              });
              response.end();




            }
          });
        }
      });
    } else {
      response.writeHead(500, "Content-Type:text/html");
      response.end("<h1>Sorry, Enter some content</h1>");
    }
  });
};



const logout = (req, res) => {
  res.writeHead(302, {
    Location: '/',
    'Set-Cookie': `token=0; Max-Age=0`
  });
  res.end();
};

module.exports = {
  serveFiles,
  insertUserData,
  admin,
  deleteUsers,
  deleteItem,
  itemsForUser,
  getUserName,
  addItem,
  checkUserData,
  logout
};
