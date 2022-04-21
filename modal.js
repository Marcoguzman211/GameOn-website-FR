function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/*Différents REGEX trouvés en ligne afin de valider les inputs de façon efficace et sans trop de code. */
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const BIRTHDATE_REGEX = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
const QUANTITY_REGEX = /^[0-9]+$/;
const NAMES_REGEX = /^[a-zA-Z\-áàâäçéèêòôöúùûüæœÁÉÈÊ]+$/;

/*Ici je cible les éléments les plus importants du DOM afin de les manipuler. */
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.getElementById('form');
const modalBody = document.querySelector('.modal-body');

/*Stockage des différents inputs dans des variables pour pouvoir les utiliser et cibler dans les fonctions de validation. */
const inputFirstName = document.querySelector('input[name=first]');
const inputLastName = document.querySelector('input[name=last]');
const inputEmail = document.querySelector('input[name=email]');
const inputBirthdate = document.querySelector('input[name=birthdate]');
const inputNumberOfTournaments = document.querySelector('input[name=quantity]');
const inputLocations = document.getElementsByName("location"); // Crée un Array avec tous les endroits possibles à sélectionner.
const conditionsCheckbox = document.querySelector('#checkbox1');// Cible la checkbox des conditions (La seule nécessaire pour valider le formulaire)

/* Balise vide sous chaque input qui sera remplies si des erreurs sont présents. */
const errorFirstName = document.getElementById("error_first");;
const errorLastName = document.getElementById("error_last");
const errorEmail = document.getElementById("error_email");
const errorBirthdate = document.getElementById("error_birthdate");
const errorQuantity = document.getElementById("error_quantity");
const errorLocation = document.getElementById('error_location');
const errorConditions = document.getElementById('error_conditions');


// launch modal form and event
const launchModal = () => modalbg.style.display = "block";
modalBtn.forEach(btn => btn.addEventListener('click', launchModal));
//launch modal form and event --  END

//Close modal form
const hideModal = () => modalbg.style.display = "none";

const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", hideModal);


/*Validation de prénom et nom :
* C'est une fonction qui prend deux arguments, l'input et la balise vide en dessous,
* les traite avec des regex et en fonction de leur nombre de caractères, peut faire
* un retour de true si le champ est bien rempli, ou false le cas contraire, tout en remplissant la balise vide
* avec un message d'erreur.
* */
const validateTextInput = (textInput, inputError) => {
  if (textInput.value.length >= 2 && textInput.value.match(NAMES_REGEX)) {
    inputError.textContent = "";
    textInput.classList.add('input-validation');
    return true;
  } else if (textInput.value.length >=2 && !textInput.value.match(NAMES_REGEX)) {
    inputError.classList.add("form-error-message");
    textInput.classList.add("input-error");
    inputError.textContent = "Ce champ ne doit pas contenir de caractères spéciaux ni d'espace.";
    return false;
  } else {
    inputError.classList.add("form-error-message");
    textInput.classList.add("input-error");
    inputError.textContent = "Veuillez entrer au moins 2 caractères.";
    return false;
  }
};
/* Deux eventsListeners qui permettent de signaler en temps réel
* si l'input du prénom ou du nom contient suffisamment des caractères avant de le valider */
inputFirstName.addEventListener('keyup', (e) => {
  inputFirstName.classList.remove('input-validation');
  if (inputFirstName.value.length < 2) {
    inputFirstName.classList.add("input-error");
  } else {
    inputFirstName.classList.remove('input-error')
  }
})

inputLastName.addEventListener('keyup', () => {
  inputLastName.classList.remove('input-validation');
  if (inputLastName.value.length < 2) {
    inputLastName.classList.add("input-error");
  } else {
    inputLastName.classList.remove('input-error');
  }
})


/*Le reste de fonctions fonctionnent sous la même logique
* Mais sans les arguments*/

//Validation du champ Email avec un REGEX
const validateEmailInput = () => {
  //Résout bug de saisie automatique : ⬇️
  errorEmail.textContent = ""
  if (inputEmail.value.match(EMAIL_REGEX)) {
    inputEmail.classList.add('input-validation');
    return true;
  } else {
    inputEmail.classList.add('input-error');
    errorEmail.classList.add("form-error-message");
    errorEmail.textContent = " L'adresse électronique n'est pas valide.";
    return false;
  }
}


//Corrige une erreur d'affichage de messages d'erreur avec le remplissage automatique
inputEmail.addEventListener("keyup", () => {
  inputEmail.classList.remove('input-error');
  inputEmail.classList.remove('input-validation');
})


/*Validation Birthdate Input
* La particularité de cette fonction est qu'elle peut afficher des messages d'erreur différents,
* quand elle est vide ou quand elle n'a pas le bon format*/
const validateBirthdate = () => {
  if (inputBirthdate.value.match(BIRTHDATE_REGEX)) {
    inputBirthdate.classList.add('input-validation');
    errorBirthdate.textContent = "";
    return true;
  } else if (inputBirthdate.value.length === 0) {
    inputBirthdate.classList.remove('input-validation');
    inputBirthdate.classList.add('input-error');
    errorBirthdate.classList.add("form-error-message");
    errorBirthdate.textContent = "Veuillez entrer une date de naissance valide.";
    return false;
  } else {
    inputBirthdate.classList.remove('input-validation');
    inputBirthdate.classList.add('input-error');
    errorBirthdate.classList.add("form-error-message");
    errorBirthdate.textContent = "Le format de votre date de naissance doit être valide.";
    return false;
  }
}

//Validation du nombre des tournois, ne peut pas être négatif ni vide.
const validateNumberOfTournaments = () => {
  if (inputNumberOfTournaments.value.match(QUANTITY_REGEX)) {
    inputNumberOfTournaments.classList.add('input-validation');
    errorQuantity.textContent = "";
    return true;
  } else if (inputNumberOfTournaments.value.length === 0) {
    inputNumberOfTournaments.classList.add('input-error');
    errorQuantity.classList.add("form-error-message");
    errorQuantity.textContent = "Veuillez saisir un chiffre.";
    return false;
  } else {
    inputNumberOfTournaments.classList.add('input-error');
    errorQuantity.classList.add("form-error-message");
    errorQuantity.textContent = "Veuillez saisir un nombre positif.";
    return false;
  }
}

/* On boucle dans le tableau inputLocations, et on vérifie s'il y a au moins un checkbox qui est coché.
* Sinon, on envoie le message d'erreur
* */

const validateLocations = () => {
  let locationSelected = "";
  inputLocations.forEach(location => {
    if(location.checked) {
      locationSelected = location.value;
      errorLocation.textContent = "";
     return true;
    }
  })
  if (locationSelected === "") {
    errorLocation.textContent = 'Veuillez choisir une ville.';
    errorLocation.classList.add('form-error-message');
    return false;
  }
  return true;
}

//Validation conditions d'utilisation
const validateConditions = () => {
  if (conditionsCheckbox.checked) {
    errorConditions.textContent = "";
    return true;
  } else {
    errorConditions.classList.add("form-error-message");
    errorConditions.textContent = "Veuillez accepter nos conditions d'utilisation";
    return false;
  }
}


//Function finale pour valider le formulaire
/* On sauvegarde le résultat de l'appel de chaque fonction dans des variables
Puis avec un switch, je compare s'il y en a au moins une qui a return false
Si toutes renvoient true, un message de remerciement est affiché. */
let formValidated;
const validate = (e) => {
  e.preventDefault();

  let firstName = validateTextInput(inputFirstName, errorFirstName);
  let lastName = validateTextInput(inputLastName, errorLastName);
  let email = validateEmailInput();
  let birthday = validateBirthdate();
  let numberOfTournaments = validateNumberOfTournaments();
  let locations = validateLocations();
  let conditions = validateConditions();

  switch(false) {
    case firstName:
      console.log('Échec input prénom');
      formValidated = false;
      break;
    case lastName:
      console.log('Échec input nom');
      formValidated = false;
      break;
    case email:
      console.log('Échec input email');
      formValidated = false;
      break;
    case birthday:
      console.log('Échec input date de naissance');
      formValidated = false;
      break;
    case numberOfTournaments:
      console.log("Échec input nombre d'évènements");
      formValidated = false;
      break;
    case locations:
      console.log('Échec input endroit choisi');
      formValidated = false;
      break;
    case conditions:
      console.log("Échec input conditions d'utilisation");
      formValidated = false;
      break;
    default:
      console.log('Tous les champs sont valides');
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
};
formData.addEventListener('submit', validate);
