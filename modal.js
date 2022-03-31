function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//REGEX
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const BIRTHDATE_REGEX = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
const QUANTITY_REGEX = /^[0-9]+$/;
const NAMES_REGEX = /^[a-zA-Z\-]+$/;

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBtnSubmit = document.querySelector(".btn-submit");
const formData = document.getElementById('form')

//Formulaire
//Elements
/*const inputFirstName = document.getElementById('first');
const inputLastName = document.getElementById('last');*/
const inputFirstName = document.querySelector('input[name=first]')
const inputLastName = document.querySelector('input[name=last]')
const inputEmail = document.querySelector('input[name=email]')
const inputBirthdate = document.querySelector('input[name=birthdate]')
const inputNumberOfTournaments = document.querySelector('input[name=quantity]')
const inputLocations = document.getElementsByName("location"); // Tous les inputs type radio
const conditionsCheckbox = document.querySelector('#checkbox1')

//Messages d'Erreur
const errorFirstName = document.getElementById("error_first"); // ajouté
const errorLastName = document.getElementById("error_last"); // ajouté
const errorEmail = document.getElementById("error_email"); // ajouté
const errorBirthdate = document.getElementById("error_birthdate"); // ajouté
const errorQuantity = document.getElementById("error_quantity"); // ajouté*/
const errorLocation = document.getElementById('error_location')
const errorConditions = document.getElementById('error_conditions')


// launch modal form and event
const launchModal = () => modalbg.style.display = "block";
modalBtn.forEach(btn => btn.addEventListener('click', launchModal))
//launch modal form and event --  END

//Close modal form
const hideModal = () => modalbg.style.display = "none";

const closeBtn = document.querySelector(".close")
closeBtn.addEventListener("click", hideModal)


//Validation firstName input value
inputFirstName.addEventListener('keyup', () => {
  inputFirstName.classList.remove('input-validation')
  if (inputFirstName.value.length < 2) {
    inputFirstName.classList.add("input-error");
  } else {
    inputFirstName.classList.remove('input-error')
  }
})

const validateFirstNameInput = () => {
  if (inputFirstName.value.length >= 2 && inputFirstName.value.match(NAMES_REGEX)) {
    errorFirstName.textContent = ""
    inputFirstName.classList.add('input-validation')
    return true
  } else {
    errorFirstName.classList.add("form-error-message")
    errorFirstName.textContent = "Veuillez entrer au moins 2 caractères pour votre prénom."
    return false
  }
}

//Validation Last Name
inputLastName.addEventListener('keyup', () => {
  inputLastName.classList.remove('input-validation')
  if (inputLastName.value.length < 2) {
    inputLastName.classList.add("input-error");
  } else {
    inputLastName.classList.remove('input-error')
  }
})

const validateLastNameInput = () => {

  if (inputLastName.value.length >= 2 && inputLastName.value.match(NAMES_REGEX)) {
    errorLastName.textContent = ""
    inputLastName.classList.add('input-validation')
    return true
  } else {
    errorLastName.classList.add("form-error-message")
    errorLastName.textContent = "Veuillez entrer au moins 2 caractères pour votre nom."
    return false
  }
}

//Validation Mail
inputEmail.addEventListener("keyup", () => {
  inputEmail.classList.remove('input-error')
  inputEmail.classList.remove('input-validation')
})

const validateEmailInput = () => {
  //Résout bug de saisie automatique : ⬇️
  errorEmail.textContent = ""
  if (inputEmail.value.match(EMAIL_REGEX)) {
    inputEmail.classList.add('input-validation')
    return true
  } else {
    inputEmail.classList.add('input-error')
    errorEmail.classList.add("form-error-message");
    errorEmail.textContent = " L'adresse électronique n'est pas valide."
    return false
  }
}


//Validation Birthdate Input
const validateBirthdate = () => {
  if (inputBirthdate.value.match(BIRTHDATE_REGEX)) {
    inputBirthdate.classList.add('input-validation')
    errorBirthdate.textContent = "";
    return true
  } else if (inputBirthdate.value.length === 0) {
    inputBirthdate.classList.add('input-error')
    errorBirthdate.classList.add("form-error-message");
    errorBirthdate.textContent = "Veuillez entrer une date de naissance.";
    return false;
  } else {
    inputBirthdate.classList.add('input-error')
    errorBirthdate.classList.add("form-error-message");
    errorBirthdate.textContent = "Le format de votre date de naissance doit être valide.";
    return false
  }
}

//Validation number of Events

const validateNumberOfTournaments = () => {
  if (inputNumberOfTournaments.value.match(QUANTITY_REGEX)) {
    inputNumberOfTournaments.classList.add('input-validation')
    errorQuantity.textContent = "";
    return true
  } else if (inputNumberOfTournaments.value.length === 0) {
    inputNumberOfTournaments.classList.add('input-error')
    errorQuantity.classList.add("form-error-message");
    errorQuantity.textContent = "Veuillez saisir un chiffre.";
    return false
  } else {
    inputNumberOfTournaments.classList.add('input-error')
    errorQuantity.classList.add("form-error-message");
    errorQuantity.textContent = "Veuillez saisir un nombre positif.";
    return false
  }
}

//Validation locations

const validateLocations = () => {
  let locationSelected = ""
  inputLocations.forEach(location => {
    if(location.checked) {
      locationSelected = location.value
      errorLocation.textContent = ""
     return true
    }
  })
  if (locationSelected === "") {
    errorLocation.textContent = 'Veuillez choisir une ville.'
    errorLocation.classList.add('form-error-message')
    return false
  }
}

//Validation conditions
const validateConditions = () => {
  if (conditionsCheckbox.checked) {
    errorConditions.textContent = ""
    return true
  } else {
    errorConditions.classList.add("form-error-message")
    errorConditions.textContent = "Veuillez accepter nos conditions d'utilisation"
    return false;
  }
}


//Function finale pour valider le formulaire
let formValidated
const validate = (e) => {
  e.preventDefault()

  if((validateFirstNameInput() === false) ||
      (validateLastNameInput() === false) ||
      (validateEmailInput() === false) ||
      (validateBirthdate() === false) ||
      (validateNumberOfTournaments() === false) ||
      (validateLocations() === false) ||
      (validateConditions() === false)) {
    formValidated = false
  } else {
    formValidated = true;
  }
  console.log(formValidated)

  if (formValidated === true) {
    console.log('Formulaire reçu avec succès')
  }

}
formData.addEventListener('submit', validate)
/*modalBtnSubmit.addEventListener('click', validate)*/
