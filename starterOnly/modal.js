function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalbgConfirm = document.querySelector(".bground-confirm");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.querySelectorAll(".close-modal");
const formInputs = document.querySelectorAll(".text-control");

const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthdateInput = document.getElementById("birthdate");
const quantityInput = document.getElementById("quantity");


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal confirm
function launchModalConfirm() {
  modalbg.style.display = "none";
  modalbgConfirm.style.display = "block";
}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal when click on X
closeModalBtn.forEach((btn) => btn.addEventListener("click", () => {
  modalbg.style.display = "none";
  modalbgConfirm.style.display = "none";
}));

// form validation check
function validate(event) {
  // prevent reload page after form validation
  event.preventDefault();

  // if error detected, return false
  let validation = true;

  // clear all errors messages before check
  document.querySelectorAll(".error-message").forEach(elt => {
    elt.parentNode.removeChild(elt);
  })

  // clear input borders before check
  formInputs.forEach(form => {
    form.style.border = "";
  })

  // check first name length
  if (!checkValueLength(firstNameInput.value, 2)) {
    // display message error
    displayErrorMessage(firstNameInput, "Nécéssite 2 caractères minimum");
    // display border red
    displayErrorBorder(firstNameInput);
    // don't validate form
    validation = false;
  }

  // check last name length
  if (!checkValueLength(lastNameInput.value, 2)) {
    displayErrorMessage(lastNameInput, "Nécéssite 2 caractères minimum");
    displayErrorBorder(lastNameInput);
    validation = false;
  }

  // check email format
  if (!checkEmailFormat(emailInput.value)) {
    displayErrorMessage(emailInput, "Le format de l'email n'est pas valide");
    displayErrorBorder(emailInput);
    validation = false;
  }

  //check date format
  if (!checkDateFormat(birthdateInput.value)) {
    displayErrorMessage(birthdateInput, "Le format de la date n'est pas valide");
    displayErrorBorder(birthdateInput);
    validation = false;
  }
  // check date is past (it's a birthday)
  else if (!checkDateIsPast(birthdateInput.value)) {
    displayErrorMessage(birthdateInput, "Vous avez voyager dans le temps...");
    displayErrorBorder(birthdateInput);
    validation = false;
  }

  // check participations count is not empty
  if (!checkValueLength(quantityInput.value, 1)) {
    displayErrorMessage(quantityInput, "Nécéssite 1 caractères minimum");
    displayErrorBorder(quantityInput);
    validation = false;
  }
  // check participations count is a number
  // and value > 0
  if (isNaN(Number(quantityInput.value))
    || 0 > Number(quantityInput.value)) {
    displayErrorMessage(quantityInput, "Valeur incorecte : un chiffre supérieur à 0 doit être renseigné");
    displayErrorBorder(quantityInput);
    validation = false;
  }

  // check if one and only one radio btn is checked
  if (1 !== document.querySelectorAll('input[name="location"]:checked').length) {
    displayErrorMessage(
      document.querySelector('input[name="location"]').parentElement.lastElementChild,
      "Veuillez selectionner un tournoi"
    );
    validation = false;
  }

  // check if conditions box is checked
  if (!document.getElementById('checkbox1').checked) {
    displayErrorMessage(
      document.getElementById('checkbox1').parentNode,
      "Veuillez accepter les conditions d'utilisation"
    );
    validation = false;
  }

  // return true and valid form if no errors
  // return false and don't valid form if error detected
  if (validation) {
    launchModalConfirm();
  }
  return validation;
}

// display functions
function displayErrorMessage(elt, message) {
  let errorElt = document.createElement('span');
  errorElt.classList = "error-message";
  errorElt.innerHTML = message;
  elt.after(errorElt);
}

// border red
function displayErrorBorder(elt) {
  elt.style.border = "2px solid red";
}

//check functions

// check value input length
function checkValueLength(value, length) {
  return length <= value.length;
}

// ckeck email format
function checkEmailFormat(value) {
  // source https://www.w3docs.com/snippets/javascript/how-to-validate-an-e-mail-using-javascript.html
  return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value));
}

// check date format
function checkDateFormat(value) {
  return !isNaN(Date.parse(value));
}

// check date is past
// return false if date value is in a future
function checkDateIsPast(value) {
  const today = Date();
  return Date.parse(today) > Date.parse(value);
}


