const form = selector("form");
const username = selector("username");
const password = selector("password");
const submitButton = selector("submit");
const error = selector("error");
const fetch = require("./fetch");
const data = {
  username: username,
  password: password
};

form.addEventListener("submit", event => {});
