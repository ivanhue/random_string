//variable declaration
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

//event listeners
sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

//popup
const btnOpenPopUp = document.getElementById('btn-forget-password');
const containerPopUp = document.getElementById('modal-reset-password');
const popup = document.getElementById('popup');
const btnClosePopUp = document.getElementById('btn-close-popup');

btnOpenPopUp.addEventListener('click', function(){
    containerPopUp.classList.add('active');
    popup.classList.add('active');
})

btnClosePopUp.addEventListener('click', function(){
    containerPopUp.classList.remove('active');
    popup.classList.remove('active');
})