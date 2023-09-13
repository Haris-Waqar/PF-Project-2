const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("form");

const validateEmail = (inputEmail) =>
  inputEmail.match(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

const validatePassword = (inputPassword) =>
  inputPassword.match(/^[a-zA-Z0-9]{6,}$/);

const generateError = (errorName, errorMsg) => {
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  if (errorName === "email") {
    emailError.innerText = errorMsg;
  } else if (errorName === "password") {
    passwordError.innerText = errorMsg;
  } else {
    emailError.innerText = "";
    passwordError.innerText = "";
  }
};

const formValidate = (inputEmail, inputPassword) => {
  if (!validateEmail(inputEmail)) {
    const emailError = "Please enter a valid email address";
    generateError("email", emailError);
    return;
  }
  if (!validatePassword(inputPassword)) {
    const passwordError =
      "Password must be at least 6 characters long and contain only letters and numbers";
    generateError("password", passwordError);
    return;
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidate(email.value, password.value);
});

email.addEventListener("focusout", (e) => {
  if (!validateEmail(email.value)) {
    email.style.borderColor = "red";
    generateError("email", "Please enter a valid email");
    email.parentElement.classList.add("error");
  }
});

password.addEventListener("focusout", (e) => {
  if (!validatePassword(password.value)) {
    password.style.borderColor = "red";
    generateError(
      "password",
      "Password must be at least 6 characters long and contain only letters and numbers"
    );
    password.parentElement.classList.add("error");
  }
});

function myFunction() {
  var eye = document.getElementById("password");
  if (eye.type === "password") {
    eye.type = "text";
  } else {
    eye.type = "password";
  }
}
