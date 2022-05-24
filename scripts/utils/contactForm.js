const closeButton = document.querySelector("#close-modal");
const modal = document.getElementById("contact_modal");
const main = document.querySelector("main");
const form = document.querySelector("#contact-form");
const formData = document.querySelectorAll(".form-data");
const first = document.querySelector("#first");
const last = document.querySelector("#last");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const headerModal = document.querySelector(".modal-title");
const contactButton = document.querySelector(".contact_button");

const nameRegex = /[a-zA-Z]/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/


function getPhotographerName(data) {
  headerModal.innerHTML += ` ${data}`;
}

//Display the contact modal
function displayModal() {
	modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("modal-open");
  main.setAttribute("aria-hidden", "true");
  first.focus();
}

//Close the contact modal
function closeModal() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  main.setAttribute("aria-hidden", "false");
  contactButton.focus()
}

//Keyboard events
window.addEventListener("keydown", (e) => {
  if(e.key === "Escape" || e.key === "Enter" && document.activeElement === closeButton) {
    e.preventDefault();
    closeModal();
  }
})

//Show error messages
function showError(inputElement, message) {
  inputElement.parentElement.dataset.errorVisible = 'true';
  inputElement.parentElement.dataset.error = message;
}

//Hide error messages
function hideError(inputElement) {
  delete inputElement.parentElement.dataset.errorVisible;
  delete inputElement.parentElement.dataset.error;
}

//First name validation
function checkFirst() {
    if(first.value.length < 2 || nameRegex.test(first.value) === false) {
        showError(first, "Veuillez entrer un prénom valide")
    } else {
        hideError(first)
    }
}

//Last name validation
function checkLast() {
  if(last.value.length < 2 || nameRegex.test(last.value) === false) {
      showError(last, "Veuillez entrer un nom valide")
  } else {
      hideError(last)
  }
}

//Email validation
function checkEmail() {
  if(first.value === "" || emailRegex.test(email.value) === false) {
      showError(email, "Veuillez entrer un email valide")
  } else {
      hideError(email)
  }
}

//Message validation
function checkMessage() {
  if(message.value.length < 10) {
      showError(message, "Veuillez laisser un message")
  } else {
      hideError(message)
  }
}

//Validation of all input and show results in the console
function validation() {
  checkFirst();
  checkLast();
  checkEmail();
  checkMessage();

  let isValid = true;
  for(let errorAttribute of formData) {
    if(errorAttribute.getAttribute("data-error")) {
      isValid = false;
    }
  }

  if(isValid) {
    console.log("ok");
    console.log("prénom : " + first.value);
    console.log("nom : " + last.value);
    console.log("email : " + email.value);
    console.log("message : " + message.value);
    form.reset();
  }
}

//Submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validation()
})