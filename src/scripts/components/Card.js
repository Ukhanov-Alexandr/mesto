export default class Card {
  constructor (data, config, handleCardClick, handleTrashClick, userId, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._userId = userId;
    this._cardOwnerId = data.owner._id;
    this._likes = data.likes;
    this._config = config;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._config.templateSelector).content;
    const cardElement = cardTemplate.querySelector(this._config.elementSelector).cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._image = this._card.querySelector(this._config.igmSelector);
    this._like = this._card.querySelector(this._config.buttonHeartSelector);
    this._trash = this._card.querySelector(this._config.trashSelector);
    this._likeCounter = this._card.querySelector(this._config.likesCounterSelector);
    this._likeStateRender()
    this._isMine();
    this._card.querySelector(this._config.captionSelector).textContent = this._name;
    this._image.src = this._link;
    this._image.alt = `Фото ${this._name}`;
    this._setEventListeners();
    return this._card;
  }

  _likeStateRender(){
    this._likeCounter.textContent = this._likes.length;
    this._like.classList.toggle(this._config.buttonHeartClassActive, this._isLiked())
  }

  _isLiked() {
    return this._likes.some((item) => item._id  ===  this._userId);
    // return this._likes.map((item) => {item._id}).includes(this._userId)
  }
  
  updateLikes = (arr) => {
    this._likes = arr; 
    this._likeStateRender()
  }

  _isMine(){
    // console.log(this._userId)
    if (!(this._userId === this._cardOwnerId)) {
      this._trash.remove()
    }
  }

  // метод удаления карточки
  deleteCardHandler(){
    this._card.remove();
    this._card = null;
  }

  _setEventListeners() {
    this._like.addEventListener("click", () => this._handleLikeClick(this._cardId, this._isLiked(), this.updateLikes));
    this._trash.addEventListener("click", () => this._handleTrashClick(this._cardId));
    this._image.addEventListener("click", () => this._handleCardClick(this._name, this._link));
  };

}