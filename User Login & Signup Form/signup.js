// Email & Password Validation
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

// Event listener for input fields validation
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidate(email.value, password.value);
});

// Event listener for email input focus out
email.addEventListener("focusout", (e) => {
  if (!validateEmail(email.value)) {
    email.style.borderColor = "red";
    generateError("email", "Please enter a valid email");
    email.parentElement.classList.add("error");
  }
});

// Event listener for password input focus out
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

// Functionality related to form submission and saving to localStorage
function handleFormSubmit(e) {
  e.preventDefault();

  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;
  const imageURL = document.getElementById("formFile").value;
  const captureImageURL = document.getElementById("photo").value;

  const user = {
    firstName,
    lastName,
    email,
    password,
    address,
    phone,
    imageURL,
    captureImageURL,
  };

  function saveToLocalStorage(user) {
    const existingUser = JSON.parse(localStorage.getItem("users")) || [];
    existingUser.push(user);

    localStorage.setItem("users", JSON.stringify(existingUser));
  }
  saveToLocalStorage(user);

  alert("Sign up successful!");
  form.reset();
}

// Event listener for form submission
form.addEventListener("submit", handleFormSubmit);

// Functionality to toggle password visibility
function myFunction() {
  var eye = document.getElementById("password");
  if (eye.type === "password") {
    eye.type = "text";
  } else {
    eye.type = "password";
  }
}

// Functionality related to capturing photos
(function () {
  var width = 320;
  var height = 0;

  var streaming = false;

  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;

  function startup() {
    video = document.getElementById("video");
    canvas = document.getElementById("canvas");
    photo = document.getElementById("photo");
    startbutton = document.getElementById("startbutton");

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then(function (stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function (err) {
        console.log("An error occurred: " + err);
      });

    video.addEventListener(
      "canplay",
      function (ev) {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);

          if (isNaN(height)) {
            height = width / (4 / 3);
          }

          video.setAttribute("width", width);
          video.setAttribute("height", height);
          canvas.setAttribute("width", width);
          canvas.setAttribute("height", height);
          streaming = true;
        }
      },
      false
    );

    startbutton.addEventListener(
      "click",
      function (ev) {
        takepicture();
        ev.preventDefault();
      },
      false
    );

    clearphoto();
  }

  function clearphoto() {
    var context = canvas.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  }

  function takepicture() {
    var context = canvas.getContext("2d");
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data);

      // Stop the video stream
      video.srcObject.getVideoTracks().forEach(function (track) {
        track.stop();
      });
    } else {
      clearphoto();
    }
  }
  window.addEventListener("load", startup, false);
})();
