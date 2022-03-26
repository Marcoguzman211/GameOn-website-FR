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
const modalBtnSubmit = document.querySelector(".btn-submit");
const formData = document.querySelector('#form');

// launch modal form and event
const launchModal = () => modalbg.style.display = "block";
modalBtn.forEach(btn => btn.addEventListener('click', launchModal))
//launch modal form and event --  END

//Close modal form
const hideModal = () => modalbg.style.display = "none";

const closeBtn = document.querySelector(".close")
closeBtn.addEventListener("click", hideModal)


//Validation firstName input value
const inputText = document.getElementById('first');
inputText.addEventListener('keyup', () => {
  console.log("Tu tapes dans prénom...")
})

const validateFirstNameInput = () => {
  console.log(inputText.value.length)

}


//Function finale pour valider le formulaire
const validate = (e) => {
  e.preventDefault()
  validateFirstNameInput()

}
formData.addEventListener('submit', validate)
