export default class Card {
  constructor (data, config, handleCardClick) {
    this._name = data.caption;
    this._link = data.link;
    this._config = config,
    this._handleCardClick = handleCardClick
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._config.templateSelector).content;
    const cardElement = cardTemplate.querySelector(this._config.elementSelector).cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._image = this._card.querySelector(this._config.igmSelector);
    this._setEventListeners();
    this._card.querySelector(this._config.captionSelector).textContent = this._name;
    this._image.src = this._link;
    this._image.alt = `Фото ${this._name}`;
    return this._card;
  }

  _setEventListeners() {
    this._like = this._card.querySelector(this._config.buttonHeartSelector);
    this._trash = this._card.querySelector(this._config.trashSelector);

    this._like.addEventListener("click", () => this._handleLikeClick());
    this._trash.addEventListener("click", () => this._handleTrashClick());
    this._image.addEventListener("click", () => this._handleCardClick(this._name, this._link));
  };

  _handleLikeClick() {
    this._like.classList.toggle(this._config.buttonHeartClassActive);
  };

  _handleTrashClick() {
    this._card.remove();
  };
}