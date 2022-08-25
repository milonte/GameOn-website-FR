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

const form = document.querySelector("form");
const formDatas = document.querySelectorAll(".formData"); // All form datas
const formInputs = document.querySelectorAll(".text-control"); // All inputs form
const firstNameInput = document.getElementById("first"); // 1st form input (firstName)
const lastNameInput = document.getElementById("last"); // 2nd form input (lastName)
const emailInput = document.getElementById("email"); // 3rd form input (email)
const birthdateInput = document.getElementById("birthdate"); // 4th form input (birthday)
const quantityInput = document.getElementById("quantity"); // 5th form input (quantity)
const locationCheckboxInputs = document.querySelectorAll('.checkbox-input'); // Locations Checkboxs
const conditionsCheckbox = document.getElementById('checkbox1') // conditions checkbox

/* --- DOM functions --- */

// reset modal form on page reload
form.reset();

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
  form.removeAttribute('data-error');
  form.removeAttribute("data-error-visible");
  form.setAttribute("data-success", "true");
}

/* --- Checks functions ---*/

// check all text inputs
formInputs.forEach(input => {
  input.addEventListener('input', event => {
    isValid(event.target.id)
  })
})

// check all location radio inputs
locationCheckboxInputs.forEach(radio => {
  radio.addEventListener('change', () => {
    isValid('location');
  })
});

// check conditions checkbox input
conditionsCheckbox.addEventListener('change', () => {
  isValid(conditionsCheckbox.id);
});


/* -- Inputs checks -- */

/**
 * Inputs validation functions
 * @param {string} inputName - Name of input (usualy ID of input)
 * @returns {bool} - Input is valid
 */
function isValid(inputName) {

  switch (inputName) {

    // FirstName Input
    case 'first': {
      // check first name length
      if (!hasMinimimLength(firstNameInput.value, 2)) {
        displayError(firstNameInput.parentElement, "Nécéssite 2 caractères minimum");
        return false;
      } else if (!isName(firstNameInput.value)) {
        displayError(firstNameInput.parentElement, "Le format du prénom n'est pas valide");
        return false;
      } else {
        displaySuccess(firstNameInput.parentElement);
        return true;
      }
    }

    // LastName Input
    case 'last': {
      // check last name length
      if (!hasMinimimLength(lastNameInput.value, 2)) {
        displayError(lastNameInput.parentElement, "Nécéssite 2 caractères minimum");
        return false;
      } else if (!isName(lastNameInput.value)) {
        displayError(lastNameInput.parentElement, "Le format du prénom n'est pas valide");
        return false;
      } else {
        displaySuccess(lastNameInput.parentElement);
        return true;
      }
    }

    // Email Input
    case 'email': {
      // check email format
      if (!isEmail(emailInput.value)) {
        displayError(emailInput.parentElement, "Le format de l'email n'est pas valide");
        return false;
      } else {
        displaySuccess(emailInput.parentElement);
        return true;
      }

    }

    // BirthDate Input
    case 'birthdate': {
      //check date format
      if (!isDate(birthdateInput.value)) {
        displayError(birthdateInput.parentElement, "Le format de la date n'est pas valide");
        return false;
      }
      // check date is past (it's a birthday)
      else if (!isDatePast(birthdateInput.value)) {
        displayError(birthdateInput.parentElement, "Vous avez voyager dans le temps...");
        return false;
      } else {
        displaySuccess(birthdateInput.parentElement);
        return true;
      }
    }

    // Participations Quantity Input
    case 'quantity': {
      // check participations count is not empty
      if (!hasMinimimLength(quantityInput.value, 1)) {
        displayError(quantityInput.parentElement, "Nécéssite 1 caractères minimum");
        return false;
      }
      // check participations count is a number
      // and value > 0
      if (isNaN(Number(quantityInput.value))
        || 0 > Number(quantityInput.value)) {
        displayError(quantityInput.parentElement, "Valeur incorecte : un chiffre supérieur à 0 doit être renseigné");
        return false;
      } else {
        displaySuccess(quantityInput.parentElement);
        return true;
      }
    }

    // Location Inputs
    case 'location': {
      // check if one and only one radio btn is checked
      if (1 !== document.querySelectorAll('input[name="location"]:checked').length) {
        displayError(
          document.querySelector('input[name="location"]').parentElement,
          "Veuillez selectionner un tournoi"
        );
        return false;
      } else {
        displaySuccess(document.querySelector('input[name="location"]').parentElement);
        return true;
      }
    }

    // Conditions agree Input
    case 'checkbox1': {
      // check if conditions box is checked
      if (!conditionsCheckbox.checked) {
        displayError(
          conditionsCheckbox.parentElement,
          "Veuillez accepter les conditions d'utilisation"
        );
        return false;
      } else {
        displaySuccess(conditionsCheckbox.parentElement);
        return true;
      }
    }
  }
}

/* -- Form validation checks --*/

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

  // if no errors, can send form
  let validation = true;

  // on submit, verify all inputs
  // if error detected, set validation to false
  // and don"t send form

  // all text control inputs
  formInputs.forEach(input => {
    if (!isValid(input.id)) { validation = false }
  })

  // all locations radios inputs
  if (!isValid('location')) { validation = false }

  // conditions input
  if (!isValid(conditionsCheckbox.id)) { validation = false }

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

/* -- Common checks -- */

/**
 * Check if value have minimum length
 * @param {string} value - string to check length
 * @param {int} length - minimum length wanted
 * @returns {bool}
 */
function hasMinimimLength(value, length) {
  return length <= value.length;
}

/**
 * Check name format
 * @param {string} value 
 * @returns 
 */
function isName(value) {
  // source https://stackoverflow.com/questions/275160/regex-for-names#2044909
  return (/^[a-zA-Z][a-zA-Z '&-]*[A-Za-z]$/.test(value));
}

/**
 * Check email format with regex
 * @param {string} value - string to check format
 * @returns {bool}
 */
function isEmail(value) {
  // source https://www.w3docs.com/snippets/javascript/how-to-validate-an-e-mail-using-javascript.html
  return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(value));
}

/**
 * Check if value can be converted to Date
 * @param {string} value - Date
 * @returns {bool}
 */
function isDate(value) {
  return !isNaN(Date.parse(value));
}

/**
 * Check if date is in past
 * @param {string} value 
 * @returns {bool}
 */
function isDatePast(value) {
  const today = Date();
  return Date.parse(today) > Date.parse(value);
}


