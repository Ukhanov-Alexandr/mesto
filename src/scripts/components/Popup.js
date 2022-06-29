export default class Popup {
  constructor(popupSelector, config){
    this._popup = document.querySelector(popupSelector);
    this._config = config;
  }

  open(){
    this._popup.classList.add(this._config.additionalPopupClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close(){
    this._popup.classList.remove(this._config.additionalPopupClass);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains(this._config.popupButtonCloseClass)) {
      this.close();
    };
  }

  setEventListeners(){
    this._popup.addEventListener('mousedown', this._handleOverlayClose);
  }
}