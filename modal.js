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
const BIRTHDATE_REGEX = /^\d{4}\-\d{2}\-\d{2}$/;
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
console.log(inputEmail)

//Messages d'Erreur
const errorFirstName = document.getElementById("error_first"); // ajouté
const errorLastName = document.getElementById("error_last"); // ajouté
const errorEmail = document.getElementById("error_email"); // ajouté
/* const errorBirthdate = document.getElementById("error_birthdate"); // ajouté
const errorQuantity = document.getElementById("error_quantity"); // ajouté*/


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
    errorLastName.textContent = "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    return false
  }
}

//Validation Mail
inputEmail.addEventListener("keyup", () => {
  inputEmail.classList.remove('input-error')
  inputEmail.classList.remove('input-validation')
})

const validateEmailInput = () => {
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


//Function finale pour valider le formulaire
let formValidated
const validate = (e) => {
  e.preventDefault()

  validateFirstNameInput()
  validateLastNameInput()
  validateEmailInput()

  if (!validateFirstNameInput()) {
    formValidated = false;
  } else if (!validateLastNameInput()) {
    formValidated = false;
  } else if (!validateEmailInput()) {
    formValidated = false;
  } else {
    formValidated = true
  }

  if (formValidated === true) {
    console.log('Yeeeesss')
  }

}
formData.addEventListener('submit', validate)
/*modalBtnSubmit.addEventListener('click', validate)*/
