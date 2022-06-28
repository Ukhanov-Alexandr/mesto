export const initialCards = [
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

//константы для index.js
export const cardСontainer = document.querySelector('.elements');
export const popupEdit = document.querySelector(".popup-edit");
export const profileName = document.querySelector(".profile__name");
export const profileAbout = document.querySelector(".profile__about");
export const buttonEdit = document.querySelector(".profile__btn_type_edit");
export const popupFormEdit = popupEdit.querySelector(".popup__form");
export const inputName = popupEdit.querySelector(".popup__input_type_name");
export const inputAbout = popupEdit.querySelector(".popup__input_type_about");
export const popupAdd = document.querySelector(".popup-add");
export const buttonAdd = document.querySelector(".profile__btn_type_add");
export const popupFormAdd =  popupAdd.querySelector(".popup__form");
export const inputCaption = popupAdd.querySelector(".popup__input_type_caption");
export const inputLink = popupAdd.querySelector(".popup__input_type_link");
export const popupImage = document.querySelector(".popup-image");
export const imageView = popupImage.querySelector(".popup-image__image");
export const imageCaption = popupImage.querySelector(".popup-image__caption");
//тут хранятся экземпляры класса FormValidator
export const formValidators = {};

export const cardConfig = {
  templateSelector: '.elements-template',
  elementSelector: '.element',
  cardСontainerSelector: '.elements',
  captionSelector: '.element__caption',
  igmSelector: '.element__img',
  buttonHeartSelector: ".element__btn-heart",
  trashSelector: '.element__trash',
  buttonHeartClassActive: 'element__btn-heart_active',
};

export const validConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  popupButtonCloseClass: 'popup__btn-close'
};

export const popupSelectors = {
  popupImageSelector: '.popup-image',
  popupEditSelector: '.popup-edit',
  popupAddSelector: '.popup-add',
}

export const additionalClass = {
  additionalPopupClass: 'popup_opened'
}