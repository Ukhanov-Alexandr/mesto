import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, config,){
    super(popupSelector, config);
    this._popupForm = this._popup.querySelector(config.formSelector);
  }

  submitHendler(callback) {
    this._handleSubmitCallback = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // console.log(this)
      this._handleSubmitCallback(this);
      // this.close();
    });
  }
}