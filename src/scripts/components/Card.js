export default class Card {
  constructor (data, config, handleCardClick, handleTrashClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    // this._isOwner = userId === ownerId;
    this._likes = data.likes;
    this._config = config;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._config.templateSelector).content;
    const cardElement = cardTemplate.querySelector(this._config.elementSelector).cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._image = this._card.querySelector(this._config.igmSelector);
    // this._likes = this._card.querySelector(this._config.cardLikesSelector);
    this._likeCounterRender();
    this._setEventListeners();
    this._card.querySelector(this._config.captionSelector).textContent = this._name;
    this._image.src = this._link;
    this._image.alt = `Фото ${this._name}`;
    return this._card;
  }

  _likeCounterRender(){
    this._card.querySelector(this._config.likesCounterSelector).textContent = this._likes.length;
  }

  // метод удаления карточки
  deleteCardHandler(){
    this._card.remove();
    // this._card = null;
  }

  _setEventListeners() {
    this._like = this._card.querySelector(this._config.buttonHeartSelector);
    this._trash = this._card.querySelector(this._config.trashSelector);

    this._like.addEventListener("click", () => this._handleLikeClick());
    this._trash.addEventListener("click", () => this._handleTrashClick(this._cardId));
    this._image.addEventListener("click", () => this._handleCardClick(this._name, this._link));
  };

  _handleLikeClick() {
    this._like.classList.toggle(this._config.buttonHeartClassActive);
  };
}