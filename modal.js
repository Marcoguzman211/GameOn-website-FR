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
const formData = document.getElementById('form')
const modalBody = document.querySelector('.modal-body')

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


/*Validation de prénom et nom*/
const validateTextInput = (textInput, inputError) => {
  if (textInput.value.length >= 2 && textInput.value.match(NAMES_REGEX)) {
    inputError.textContent = ""
    textInput.classList.add('input-validation')
    return true
  } else {
    inputError.classList.add("form-error-message")
    inputError.textContent = "Veuillez entrer au moins 2 caractères."
    return false
  }
}
//Validation firstName input value
inputFirstName.addEventListener('keyup', () => {
  inputFirstName.classList.remove('input-validation')
  if (inputFirstName.value.length < 2) {
    inputFirstName.classList.add("input-error");
  } else {
    inputFirstName.classList.remove('input-error')
  }
})

//Validation Last Name value
inputLastName.addEventListener('keyup', () => {
  inputLastName.classList.remove('input-validation')
  if (inputLastName.value.length < 2) {
    inputLastName.classList.add("input-error");
  } else {
    inputLastName.classList.remove('input-error')
  }
})

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
  return true
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

  let firstName = validateTextInput(inputFirstName, errorFirstName)
  let lastName = validateTextInput(inputLastName, errorLastName)
  let email = validateEmailInput()
  let birthday = validateBirthdate()
  let numberOfTournaments = validateNumberOfTournaments()
  let locations = validateLocations()
  let conditions = validateConditions()

  console.log(locations)

  if(!firstName||
      !lastName ||
      !email ||
      !birthday ||
      !numberOfTournaments ||
      !locations ||
      !conditions) {
    formValidated = false
  } else {
    console.log(formValidated)
    formValidated = true;
  }

  if (formValidated === true) {
    modalBody.innerHTML = `<div class="thanks modal-thanks" id="thanks">
              <div class="thanks-message">
                <p>Merci pour votre inscription</p>
                <button class="btn-submit" onclick=window.location.reload()>Fermer</button>
              </div>
            </div>`
  }
}
formData.addEventListener('submit', validate)
