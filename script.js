const popup = document.querySelector(".popup");
const popupForm = document.querySelector(".popup__container");
const popupOpenBtn = document.querySelector(".profile__btn_edit");
const popupCloseBtn = document.querySelector(".popup__btn-close");
const popupSaveBtn = document.querySelector(".popup__btn-save");

let popupName = document.querySelector(".profile__name");
let popupPosition = document.querySelector(".profile__position");

let inputName = document.querySelector(".popup__name");
let inputPosition = document.querySelector(".popup__position");


function popupToggle () {
    popup.classList.toggle("popup_opened");
}

popupOpenBtn.addEventListener("click", function() {
    popupToggle ()
    inputName.value = popupName.textContent;
    inputPosition.value = popupPosition.textContent;
});

popupCloseBtn.addEventListener("click", function() {
    popupToggle ()
});

popupForm.addEventListener("submit", function(evt) {
    evt.preventDefault();
    popupName.textContent = inputName.value;
    popupPosition.textContent = inputPosition.value;
    popupToggle ()
});