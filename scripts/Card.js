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

class Card {
  constructor (data, selector, handleCardClick) {
    this._title = data.name;
    this._link = data.link;
    this._templateSelector = selector.templateSelector;
    this._elementSelector = selector.elementSelector;
    this._handleCardClick = handleCardClick
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
    this._card.querySelector(cardConfig.igmSelector).alt = `Фото ${this._title}`;
    return this._card;
  }

  _setEventListeners() {
    this._like = this._card.querySelector(cardConfig.buttonHeartSelector);
    this._trash = this._card.querySelector(cardConfig.trashSelector);
    this._image = this._card.querySelector(cardConfig.igmSelector);

    this._like.addEventListener("click", () => this._handleLikeClick());
    this._trash.addEventListener("click", () => this._handleTrashClick());
    this._image.addEventListener("click", () => this._handleCardClick(this._name, this._link));
  };

  _handleLikeClick() {
    this._like.classList.toggle(cardConfig.buttonHeartClassActive);
  };

  _handleTrashClick() {
    this._card.remove();
  };
}

export default Card;