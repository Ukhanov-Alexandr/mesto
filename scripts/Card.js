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

export const cardConfig = {
    templateSelector: '.elements-template',
    elementSelector: '.element',
    cardСontainerSelector: '.elements',
    captionSelector: '.element__caption',
    igmSelector: '.element__img',
    buttonHeartSelector: ".element__btn-heart",
    trashSelector: '.element__trash',
    buttonHeartClassActive: 'element__btn-heart_active'
};

import {openPopup} from './index.js';
const popupImage = document.querySelector(".popup-image");
const imageView = popupImage.querySelector(".popup-image__image");
const imageCaption = popupImage.querySelector(".popup-image__caption");

class Card {
  constructor (data, selector) {
    this._title = data.name;
    this._link = data.link;
    this._templateSelector = selector.templateSelector;
    this._elementSelector = selector.elementSelector;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const cardElement = cardTemplate.querySelector(this._elementSelector).cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
    this._card.querySelector(cardConfig.captionSelector).textContent = this._title;
    this._card.querySelector(cardConfig.igmSelector).src = this._link;
    return this._card;
  }

  _setEventListeners() {
    this._like = this._card.querySelector(cardConfig.buttonHeartSelector);
    this._trash = this._card.querySelector(cardConfig.trashSelector);
    this._image = this._card.querySelector(cardConfig.igmSelector);

    this._like.addEventListener("click", () => this._handleLikeClick());
    this._trash.addEventListener("click", () => this._handleTrashClick());
    this._image.addEventListener("click", () => this._handleImageClick());
  };

  _handleLikeClick() {
    this._like.classList.toggle(cardConfig.buttonHeartClassActive);
  };

  _handleTrashClick() {
    this._card.remove();
  };

  _handleImageClick() {
    imageView.src = this._link;
    imageView.alt = `Фото ${this._title}`;
    imageCaption.textContent = this._title;
    openPopup(popupImage);
  }
}

initialCards.forEach((item) => {
  const card = new Card(item, cardConfig);
  const cardElement = card.generateCard();
  document.querySelector(cardConfig.cardСontainerSelector).prepend(cardElement);
});

export default Card;

