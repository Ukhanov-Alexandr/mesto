export const initialCards = [
    {
      caption: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
      caption: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      caption: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      caption: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      caption: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      caption: 'Jared',
      link: 'https://media0.giphy.com/media/l41YwWrjEhTGpE3zG/giphy.gif?cid=790b7611a485b2e4c2c72018ce88b1663564f45827d0a363&rid=giphy.gif&ct=g'
    }
];

export const legends = [
  {
    caption: 'Arnie',
    link: 'https://i.pinimg.com/564x/1d/46/4b/1d464b2e0d76083e8b00e3a590b7e43d.jpg'
  },
  {
    caption: 'Bruce Lee',
    link: 'https://i.pinimg.com/564x/9e/10/57/9e1057740fe2d5cd51094a5fe408bbca.jpg'
  },
  {
    caption: 'Chuck Norris',
    link: 'https://i.pinimg.com/564x/96/b3/b5/96b3b5f3e82f031edbf8cca6f6136deb.jpg'
  },
  {
    caption: 'Sylvester Stallone',
    link: 'https://i.pinimg.com/564x/28/9d/46/289d46f84fae753c6c673896382d5bf2.jpg'
  },
  {
    caption: 'Jackie Chan',
    link: 'https://i.pinimg.com/564x/e7/d4/9d/e7d49ddfa53b0a9a528748a8afc9b9a1.jpg'
  },
  {
    caption: 'Jean-Claude Van Damme',
    link: 'https://i.pinimg.com/originals/02/63/de/0263de704e0c36a0354fde116e05ef1f.gif'
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
};

export const popupSelectors = {
  popupImageSelector: '.popup-image',
  popupEditSelector: '.popup-edit',
  popupAddSelector: '.popup-add',
}

export const popupConfig = {
  additionalPopupClass: 'popup_opened',
  popupButtonCloseClass: 'popup__btn-close',
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  imageViewSelector: '.popup-image__image',
  imageCaptionSelector: '.popup-image__caption'
}

export const userInfoConfig = {
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about'
}