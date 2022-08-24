/* -----  NAVBAR  ------ */

function editNav() {
  var navLinks = document.querySelector('.responsive');
  if (navLinks.classList.contains("hide-responsive")) {
    navLinks.classList.add("show-responsive");
    navLinks.classList.remove("hide-responsive");
  } else if (navLinks.classList.contains("show-responsive")) {
    navLinks.classList.add("hide-responsive");
    navLinks.classList.remove("show-responsive");
    setTimeout(() => { navLinks.classList.remove('hide-responsive') }, 500);
  } else {
    navLinks.classList.add("show-responsive");
  }
}


/* -----  MODAL  ------ */

/* --- DOM elements --- */
const modalbg = document.querySelector(".bground"); // form modal
const modalbgConfirm = document.querySelector(".bground-confirm"); // confirmation modal
const modalBtn = document.querySelectorAll(".modal-btn"); // Buttons to launch form modal
const closeModalBtn = document.querySelectorAll(".close-modal"); // Buttons X to close modal

const formDatas = document.querySelectorAll(".formData"); // All form datas
const formInputs = document.querySelectorAll(".text-control"); // All inputs form
const firstNameInput = document.getElementById("first"); // 1st form input (firstName)
const lastNameInput = document.getElementById("last"); // 2nd form input (lastName)
const emailInput = document.getElementById("email"); // 3rd form input (email)
const birthdateInput = document.getElementById("birthdate"); // 4th form input (birthday)
const quantityInput = document.getElementById("quantity"); // 5th form input (quantity)
const conditionsCheckbox = document.getElementById('checkbox1') // conditions checkbox

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
 * Allow body to scroll (set false when modal open)
 * @param {bool} allow 
 */
function allowBodyScroll(allow) {
  allow ?
    document.querySelector('body').style.overflowY = "scroll"
    : document.querySelector('body').style.overflowY = "hidden";
}

/**
 * Show modal
 * @param {HTMLElement} modal 
 */
function launchModal(modal) {
  modal.style.display = "block";
  allowBodyScroll(false);
}

/**
 * Close modal
 * @param {HTMLElement} modal 
 */
function closeModal(modal) {
  modal.style.display = "none";
  allowBodyScroll(true);
}

/**
 * Display error message & border error after input
 * @param  {HTMLElement} input - Display message will be display after this element
 * @param  {string} message - Message to display
 * @return {void}
 */
function displayError(form, message) {
  form.setAttribute('data-error', message);
  form.setAttribute("data-error-visible", "true");
  form.removeAttribute("data-success");
}

/**
 * Remove error messages & display success border
 * @param {HTMLElement} form 
 * @return {void}
 */
function displaySuccess(form) {
  console.log(form)
  form.removeAttribute('data-error');
  form.removeAttribute("data-error-visible");
  form.setAttribute("data-success", "true");
}

/* --- Form validation functions ---*/

/**
 * Form validation function
 * Return true (and valid form send) if no errors detected
 * Return false & display error messages if errors detected
 * @param {SubmitEvent} event 
 * @returns {boolean}
 */
function validate(event) {
  // prevent reload page after form validation
  event.preventDefault();

  // if error detected, return false
  let validation = true;

  // draw all input borders in green (valid)
  // replace with red borders if invalid values
  formDatas.forEach(elt => {
    displaySuccess(elt);
  })

  // check first name length
  if (!checkMinimumLength(firstNameInput.value, 2)) {
    // display message error
    displayError(firstNameInput.parentElement, "Nécéssite 2 caractères minimum");
    // don't validate form
    validation = false;
  }

  // check last name length
  if (!checkMinimumLength(lastNameInput.value, 2)) {
    displayError(lastNameInput.parentElement, "Nécéssite 2 caractères minimum");
    validation = false;
  }

  // check email format
  if (!checkEmailFormat(emailInput.value)) {
    displayError(emailInput.parentElement, "Le format de l'email n'est pas valide");
    validation = false;
  }

  //check date format
  if (!checkDateFormat(birthdateInput.value)) {
    displayError(birthdateInput.parentElement, "Le format de la date n'est pas valide");
    validation = false;
  }
  // check date is past (it's a birthday)
  else if (!checkDateIsPast(birthdateInput.value)) {
    displayError(birthdateInput.parentElement, "Vous avez voyager dans le temps...");
    validation = false;
  }

  // check participations count is not empty
  if (!checkMinimumLength(quantityInput.value, 1)) {
    displayError(quantityInput.parentElement, "Nécéssite 1 caractères minimum");
    validation = false;
  }
  // check participations count is a number
  // and value > 0
  if (isNaN(Number(quantityInput.value))
    || 0 > Number(quantityInput.value)) {
    displayError(quantityInput.parentElement, "Valeur incorecte : un chiffre supérieur à 0 doit être renseigné");
    validation = false;
  }

  // check if one and only one radio btn is checked
  if (1 !== document.querySelectorAll('input[name="location"]:checked').length) {
    displayError(
      document.querySelector('input[name="location"]').parentElement,
      "Veuillez selectionner un tournoi"
    );
    validation = false;
  }

  // check if conditions box is checked
  if (!conditionsCheckbox.checked) {
    displayError(
      conditionsCheckbox.parentElement,
      "Veuillez accepter les conditions d'utilisation"
    );
    validation = false;
  }

  // if form is valid
  // close form modal & open confirm message modal
  if (validation) {
    closeModal(modalbg);
    launchModal(modalbgConfirm);
  }

  // return true and valid form if no errors
  // return false and don't valid form if error detected
  return validation;
}

/* --- Checks functions ---*/

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
 * @returns {bool}
 */
function checkDateIsPast(value) {
  const today = Date();
  return Date.parse(today) > Date.parse(value);
}


