import {additionalClass, validConfig} from '../utils/constants.js';
export default class Popup {
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
  }

  open(){
    this._popup.classList.add(additionalClass.additionalPopupClass);
  }

  close(){
    this._popup.classList.remove(additionalClass.additionalPopupClass);
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._handleOverlayClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains(validConfig.popupButtonCloseClass)) {
      this.close();
    };
  }

  setEventListeners(){
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._handleOverlayClose);
  }
}