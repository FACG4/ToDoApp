const fs = require("fs");
const bcrypt = require("bcrypt");
const queryString = require("querystring");
const path = require("path");
const auth_u = require("./database/queries/auth.js");
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
            }); <<
            <<
            <<
            <
            HEAD
            response.end("<h1>This name is already exists!</h1>") ===
              ===
              =
              response.end("<h1>Sorry, problem in signing up!</h1>"); >>>
            >>>
            >
            1 aeef233cf8081dea2cc4f6375cc169da2b703df
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
      } <<
      <<
      <<
      <
      HEAD
    })
  } ===
  ===
  =
});
}; >>>
>>>
>
1 aeef233cf8081dea2cc4f6375cc169da2b703df

const admin = (request, response) => {

  getQuery.getUsersInfo((error, result) => {
    if (error) {
      console.log(error);
      response.writeHead(500, {
        "content-Type": "text/html"
      });
      response.end("<h1>Sorry, something wrong with getting users data!</h1>");
    } else {
      response.writeHead(200, {
        "Content-Type": "application/json"
      });
      response.end(JSON.stringify(result));
    } <<
    <<
    <<
    <
    HEAD
  })
}

const itemsForUser = (request, response) => {
  //cookie to get id of user
  getQuery.getListItemsForUser(2, (error, result) => {
    if (error) {
      console.log(error);
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

const getUserName = (request, response) => {
    //cookie to get id of user
    getQuery.getUserName(2, (error, result) => {
      if (error) {
        console.log(error);
        response.writeHead(500, {
          'content-Type': 'text/html'
        });
        response.end("<h1>Sorry, something wrong with getting user name!</h1>")
      } else {
        response.writeHead(200, {
          'Content-Type': 'application/json'
        });
        response.end(JSON.stringify(result));
      }
    })
  }

  ===
  ===
  =
});
}; >>>
>>>
>
1 aeef233cf8081dea2cc4f6375cc169da2b703df

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
          console.log('ffff');
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
    // console.log(passwordd);
    // console.log(response);
    if (name.length > 0) {
      auth_u.checkUsersInfo(name, passwordd, (err, res) => {
        if (err) {
          let typeError = err.type;
          if (typeError === "database error") {
            response.writeHead(500, "Content-Type:text/html");
            response.end("<h1>Sorry, something error</h1>");
          } else {
            response.writeHead(500, "Content-Type:text/html");
            response.end("<h1>Sorry, password not match</h1>");
          }
        } else if (response.length == 0) {
          response.writeHead(500, "Content-Type:text/html");
          response.end("<h1>Sorry, user not found</h1>");
        } else {
          console.log(response);
          response.writeHead(302, {
            location: "../public/html/success_login.html"
          });
          response.end("Done");
        }
      });
    } else {
      response.writeHead(500, "Content-Type:text/html");
      response.end("<h1>Sorry, Enter some content</h1>");
    }
  });
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
  checkUserData
};
