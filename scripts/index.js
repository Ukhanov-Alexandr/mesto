const popup = document.querySelector(".popup");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const btnEdit = document.querySelector(".profile__btn_type_edit");
const popupForm = document.querySelector(".popup__form");
const btnClosePopup = document.querySelector(".popup__btn-close");
const inputName = document.querySelector(".popup__input_type_name");
const inputAbout = document.querySelector(".popup__input_type_about");

function popupToggle () {
    popup.classList.toggle("popup_opened");
}

function popupOpen () {
    popupToggle();
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent; 
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    popupToggle();
};

btnEdit.addEventListener("click", popupOpen);
btnClosePopup.addEventListener("click", popupToggle);
popupForm.addEventListener("submit", formSubmitHandler);