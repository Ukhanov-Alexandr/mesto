import FormValidator from './FormValidator.js';
import Card from './Card.js';
import {validConfig} from './FormValidator.js';
import {cardConfig} from './Card.js';

const cardСontainer = document.querySelector('.elements');
const popupEdit = document.querySelector(".popup-edit");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const buttonEdit = document.querySelector(".profile__btn_type_edit");
const popupFormEdit = popupEdit.querySelector(".popup__form");
const inputName = popupEdit.querySelector(".popup__input_type_name");
const inputAbout = popupEdit.querySelector(".popup__input_type_about");
const popupAdd = document.querySelector(".popup-add");
const buttonAdd = document.querySelector(".profile__btn_type_add");
const popupFormAdd =  popupAdd.querySelector(".popup__form");
const inputCaption = popupAdd.querySelector(".popup__input_type_caption");
const inputLink = popupAdd.querySelector(".popup__input_type_link");

//функция открывает попап + вешает слушатель на esc и оверлей
export function openPopup (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEsc);
  popup.addEventListener('mousedown', handleOverlayClick);
};

//функция закрывает попап и удаляет ненужные слушатели
function closePopup (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEsc);
  popup.removeEventListener('mousedown', handleOverlayClick);
};

// функция закрывает попап при клике на оверлей
const handleOverlayClick = (evt) => {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__btn-close')) {
    closePopup(evt.currentTarget);
  };
};

// функция закрывает попап на esc
function closeByEsc (evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

//хендлер для формы edit
function handleEditSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupEdit);
};

//хендлер для формы add
function handleAddSubmit (evt) {
  evt.preventDefault();
  const data = {
    name: inputCaption.value,
    link: inputLink.value
  };
  const card = new Card(data, cardConfig);
  const cardElement = card.generateCard();
  cardСontainer.prepend(cardElement);
  closePopup(popupAdd);
  popupFormAdd.reset();
};

//функция очищает форму
const formClean = (popup) => {
  const formPopup = popup.querySelector(validConfig.formSelector);
  const formValidatorOn = new FormValidator(validConfig, formPopup);
  formValidatorOn.checkValid(popup);
}

//при открытии popupEdit
buttonEdit.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  formClean(popupEdit);
  openPopup(popupEdit);
});

//при открытии popupAdd
buttonAdd.addEventListener("click", () => {
  popupFormAdd.reset();
  formClean(popupAdd);
  openPopup(popupAdd);
});

popupFormEdit.addEventListener("submit", handleEditSubmit)
popupFormAdd.addEventListener("submit", handleAddSubmit);

const formList = Array.from(document.querySelectorAll(validConfig.formSelector));
formList.forEach((formElement) => {
    const formValidatorOn = new FormValidator(validConfig, formElement);
    formValidatorOn.enableValidation();
});