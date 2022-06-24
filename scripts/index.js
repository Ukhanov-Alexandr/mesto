import FormValidator from './FormValidator.js';
import Card from './Card.js';
import {validConfig} from './FormValidator.js';
import {cardConfig} from './Card.js';

const initialCards = [
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Jared',
    link: 'https://media0.giphy.com/media/l41YwWrjEhTGpE3zG/giphy.gif?cid=790b7611a485b2e4c2c72018ce88b1663564f45827d0a363&rid=giphy.gif&ct=g'
  }
];

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

const popupImage = document.querySelector(".popup-image");
const imageView = popupImage.querySelector(".popup-image__image");
const imageCaption = popupImage.querySelector(".popup-image__caption");

//тут хранятся экземпляры класса FormValidator
const formValidators = {}

//функция открывает попап + вешает слушатель на esc и оверлей
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEsc);
  popup.addEventListener('mousedown', handleOverlayClick);
};

//функция закрывает попап и удаляет ненужные слушатели
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEsc);
  popup.removeEventListener('mousedown', handleOverlayClick);
};

//функция закрывает попап при клике на оверлей
const handleOverlayClick = (evt) => {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__btn-close')) {
    closePopup(evt.currentTarget);
  };
};

//функция закрывает попап на esc
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

//хендлер для формы edit
function handleEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupEdit);
};

//хендлер для клика по карточке
function handleCardClick(title, link) {
  imageView.src = link;
  imageView.alt = `Фото ${title}`;
  imageCaption.textContent = title;
  openPopup(popupImage);
};

//функция добавляет готовые катрочки 
function cardRender(card) {
  cardСontainer.prepend(card);
};

//функция по созданию карты
function createCard(data) {
  const card = new Card(data, cardConfig, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

//отрисовка начального массива карт
initialCards.forEach((item) => {
  cardRender(createCard(item));
});

//хендлер для формы add
function handleAddSubmit(evt) {
  evt.preventDefault();
  const input = {
    name: inputCaption.value,
    link: inputLink.value
  };
  cardRender(createCard(input));
  closePopup(popupAdd);
  popupFormAdd.reset();
};

//функция очищает форму 
const formClean = (popup) => {
  const form = popup.querySelector(validConfig.formSelector);
  formValidators[form.name].checkValid();
};

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

popupFormEdit.addEventListener("submit", handleEditSubmit);
popupFormAdd.addEventListener("submit", handleAddSubmit);

//функция создает экземпляры FormValidator, кладет их в объект formValidators,
//включает валидацию форм
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validity = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validity
    validity.enableValidation();
  });
};

enableValidation(validConfig);