/* -----  NAVBAR  ------ */

function editNav() {
  var nav = document.getElementById("myTopnav");
  if (nav.className === "topnav") {
    nav.className += " responsive";
  } else {
    nav.className = "topnav";
  }
}


/* -----  MODAL  ------ */

/* --- DOM elements --- */
const modalbg = document.querySelector(".bground"); // form modal
const modalbgConfirm = document.querySelector(".bground-confirm"); // confirmation modal
const modalBtn = document.querySelectorAll(".modal-btn"); // Buttons to launch form modal
const closeModalBtn = document.querySelectorAll(".close-modal"); // Buttons X to close modal

const formInputs = document.querySelectorAll(".text-control"); // All inputs form
const firstNameInput = document.getElementById("first"); // 1st form input (firstName)
const lastNameInput = document.getElementById("last"); // 2nd form input (lastName)
const emailInput = document.getElementById("email"); // 3rd form input (email)
const birthdateInput = document.getElementById("birthdate"); // 4th form input (birthday)
const quantityInput = document.getElementById("quantity"); // 5th form input (quantity)

/* --- DOM functions --- */

// launch modal event on click on modal btn
modalBtn.forEach(
  (btn) => btn.addEventListener(
    "click", () => launchModal(modalbg)
  ));

// close modal when click on X btn
closeModalBtn.forEach((btn) => btn.addEventListener("click", () => {
  closeModal(modalbg);
  closeModal(modalbgConfirm);
}));

/**
 * Show modal
 * @param {HTMLElement} modal 
 */
function launchModal(modal) {
  modal.style.display = "block";
}

/**
 * Close modal
 * @param {HTMLElement} modal 
 */
function closeModal(modal) {
  modal.style.display = "none";
}

/**
 * Display error message after input
 * @param  {HTMLElement} elt - Display message will be display after this element
 * @param  {string} message - Message to display
 * @return {void}
 */
function displayErrorMessage(elt, message) {
  let errorElt = document.createElement('span');
  errorElt.classList = "error-message";
  errorElt.innerHTML = message;
  elt.after(errorElt);
}

/**
 * Draw input border
 * @param {HTMLInputElement} input - input to draw
 * @param {boolean} valid - true: green | false: red
 * @return {void}
 */
function drawInputBorder(input, valid = false) {
  if (valid) {
    input.style.border = "3px solid green";
  } else {
    input.style.border = "3px solid red";
  }
}

/* --- Form validation functions ---*/

/**
 * Form validation function
 * Return true (and valid form send) if no errors detected
 * Return false & display error messages if errors detected
 * @param {Event} event 
 * @returns {boolean}
 */
function validate(event) {
  // prevent reload page after form validation
  event.preventDefault();

  // if error detected, return false
  let validation = true;

  // clear all errors messages before check
  document.querySelectorAll(".error-message").forEach(elt => {
    elt.parentNode.removeChild(elt);
  })

  // draw all input borders in green (valid)
  // replace with red borders if invalid values
  formInputs.forEach(input => {
    drawInputBorder(input, true);
  })

  // check first name length
  if (!checkMinimumLength(firstNameInput.value, 2)) {
    // display message error
    displayErrorMessage(firstNameInput, "Nécéssite 2 caractères minimum");
    // display border red
    drawInputBorder(firstNameInput);
    // don't validate form
    validation = false;
  }

  // check last name length
  if (!checkMinimumLength(lastNameInput.value, 2)) {
    displayErrorMessage(lastNameInput, "Nécéssite 2 caractères minimum");
    drawInputBorder(lastNameInput);
    validation = false;
  }

  // check email format
  if (!checkEmailFormat(emailInput.value)) {
    displayErrorMessage(emailInput, "Le format de l'email n'est pas valide");
    drawInputBorder(emailInput);
    validation = false;
  }

  //check date format
  if (!checkDateFormat(birthdateInput.value)) {
    displayErrorMessage(birthdateInput, "Le format de la date n'est pas valide");
    drawInputBorder(birthdateInput);
    validation = false;
  }
  // check date is past (it's a birthday)
  else if (!checkDateIsPast(birthdateInput.value)) {
    displayErrorMessage(birthdateInput, "Vous avez voyager dans le temps...");
    drawInputBorder(birthdateInput);
    validation = false;
  }

  // check participations count is not empty
  if (!checkMinimumLength(quantityInput.value, 1)) {
    displayErrorMessage(quantityInput, "Nécéssite 1 caractères minimum");
    drawInputBorder(quantityInput);
    validation = false;
  }
  // check participations count is a number
  // and value > 0
  if (isNaN(Number(quantityInput.value))
    || 0 > Number(quantityInput.value)) {
    displayErrorMessage(quantityInput, "Valeur incorecte : un chiffre supérieur à 0 doit être renseigné");
    drawInputBorder(quantityInput);
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
    closeModal(modalbg);
    launchModal(modalbgConfirm);
  }

  return validation;
}

//check functions

/**
 * Check if value have minimum length
 * @param {string} value - string to check length
 * @param {int} length - minimum length wanted
 * @returns {bool}
 */
function checkMinimumLength(value, length) {
  return length <= value.length;
}

/**
 * Check email format with regex
 * @param {string} value - string to check format
 * @returns {bool}
 */
function checkEmailFormat(value) {
  // source https://www.w3docs.com/snippets/javascript/how-to-validate-an-e-mail-using-javascript.html
  return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value));
}

/**
 * Check if value can be converted to Date
 * @param {string} value - Date
 * @returns {bool}
 */
function checkDateFormat(value) {
  return !isNaN(Date.parse(value));
}

/**
 * Check if date is in past
 * @param {string} value 
 * @returns 
 */
function checkDateIsPast(value) {
  const today = Date();
  return Date.parse(today) > Date.parse(value);
}


