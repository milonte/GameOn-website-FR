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
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.querySelector(".close");
const formInputs = document.querySelectorAll(".text-control");
const errorMessages = document.querySelectorAll(".error-message");

// errors messages

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal when click on X
closeModalBtn.addEventListener("click", () => {
  modalbg.style.display = "none";
});

// form validation check
function validate() {
  // if error detected, return false
  let validation = true;

  // clear all errors messages before check
  errorMessages.forEach(message => {
    message.innerHTML = "";
  });

  // clear input borders before check
  formInputs.forEach(form => {
    form.style.border = "";
  })

  // check first name length
  if (!checkValueLength(formInputs[0].value, 2)) {
    // display message error
    errorMessages[0].innerHTML = "Nécéssite 2 caractères minimum";
    // set border input to red
    formInputs[0].style.border = "2px solid red"
    // don't validate form
    validation = false;
  }

  // check last name length
  if (!checkValueLength(formInputs[1].value, 2)) {
    errorMessages[1].innerHTML = "Nécéssite 2 caractères minimum";
    formInputs[1].style.border = "2px solid red"
    validation = false;
  }

  // check email format
  if (!checkEmailFormat(formInputs[2].value)) {
    errorMessages[2].innerHTML = "Le format de l'email n'est pas valide";
    formInputs[2].style.border = "2px solid red"
    validation = false;
  }

  //check date format
  if (!checkDateFormat(formInputs[3].value)) {
    errorMessages[3].innerHTML = "Le format de la date n'est pas valide";
    formInputs[3].style.border = "2px solid red"
    validation = false;
  }
  // check date is past (it's a birthday)
  else if (!checkDateIsPast(formInputs[3].value)) {
    errorMessages[3].innerHTML = "Vous avez voyager dans le temps...";
    formInputs[3].style.border = "2px solid red"
    validation = false;
  }

  // check participations count is not empty
  if (!checkValueLength(formInputs[4].value, 1)) {
    errorMessages[4].innerHTML = "Nécéssite 1 caractères minimum";
    formInputs[4].style.border = "2px solid red"
    validation = false;
  }
  // check participations count is a number
  // and value > 0
  if (isNaN(Number(formInputs[4].value))
    || 0 > Number(formInputs[4].value)) {
    errorMessages[4].innerHTML = "Valeur incorecte : un chiffre supérieur à 0 doit être renseigné";
    formInputs[4].style.border = "2px solid red"
    validation = false;
  }

  // check if one and only one radio btn is checked
  if (1 !== document.querySelectorAll('input[name="location"]:checked').length) {
    errorMessages[5].innerHTML = "Veuillez selectionner un tournoi";
    validation = false;
  }

  // check if conditions box is checked
  if (!document.getElementById('checkbox1').checked) {
    errorMessages[6].innerHTML = "Veuillez accepter les conditions d'utilisation";
    validation = false;
  }

  // return true and valid form if no errors
  // return false and don't valid form if error detected
  return validation;
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


