//константы для index.js
export const cardСontainer = document.querySelector('.elements');
export const popupEdit = document.querySelector(".popup-edit");
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
export const buttonAvatar = document.querySelector('.profile__btn-edit-avatar');
export const popupAvatar = document.querySelector('.popup-avatar')
//тут хранятся экземпляры класса FormValidator
export const formValidators = {};

export const apiConfig = {
  url: "https://nomoreparties.co/v1/cohort-45",
  headers: {
    authorization: "672e954f-60da-45a7-8529-433a3c093bb6",
    "Content-Type": "application/json",
  },
};

export const cardConfig = {
  templateSelector: '.elements-template',
  elementSelector: '.element',
  cardСontainerSelector: '.elements',
  captionSelector: '.element__caption',
  igmSelector: '.element__img',
  buttonHeartSelector: ".element__btn-heart",
  trashSelector: '.element__trash',
  buttonHeartClassActive: 'element__btn-heart_active',
  likesCounterSelector: '.element__like-counter'
};

export const validConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

export const popupSelectors = {
  popupImageSelector: '.popup-image',
  popupEditSelector: '.popup-edit',
  popupAddSelector: '.popup-add',
  popupDeleteSelector: '.popup-delete',
  popupAvatarSelector: '.popup-avatar'
}

export const popupConfig = {
  additionalPopupClass: 'popup_opened',
  popupButtonCloseClass: 'popup__btn-close',
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  imageViewSelector: '.popup-image__image',
  imageCaptionSelector: '.popup-image__caption',
  submitSelector: '.popup__btn-save',
  buttonSubmitLoadText: 'Сохранение...'
}

export const userInfoConfig = {
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar'
}