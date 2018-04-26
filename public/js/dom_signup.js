const form = selector('form');
const username = selector('username');
const password = selector('password');
const confirmPassword = selector('cpassword');
const bio = selector('bio');
const submitButton = selector('submit');
const error = selector('error');

const data = {
  username: username,
  password: password,
  confirmPassword: confirmPassword,
  bio: bio
};

form.addEventListener('submit', (event) => {

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


})
