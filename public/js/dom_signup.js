const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('cpassword');
const bio = document.getElementById('bio');
const submitButton = document.getElementById('submit');
const error = document.getElementById('error');
const data = {
  username : username,
  password : password,
  confirmPassword:confirmPassword,
  bio: bio};

 form.addEventListener('submit' , (event)=>{

if (password.validity.valueMissing || confirmPassword.validity.valueMissing) {
    error.textContent = "Please enter a password";
    event.preventDefault();
  }

  if (password.validity.patternMismatch ||
    confirmPassword.validity.patternMismatch
  ) {
    error.textContent =
      "Password must contain at least eight characters, including one letter and one number";
    event.preventDefault();
  }

  if (password.value != confirmPassword.value) {
    error.textContent = "Passwords do not match";
    event.preventDefault();
  }

  if (username.validity.valueMissing) {
    error.textContent = "Please enter a name";
    event.preventDefault();
  }

  if (bio.validity.valueMissing) {
    error.textContent = "Please enter a bio";
    event.preventDefault();
  }

  // 
  // fetch('/insertUser', {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  // }).then(res => res.json())
  // .catch(error => console.error('Error:', error));

 })
