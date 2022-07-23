import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, config, {callbackSubmit}){
    super(popupSelector, config);
    this._callbackSubmit = callbackSubmit;
    this._popupForm = this._popup.querySelector(config.formSelector);
    this._inputList = Array.from(this._popupForm.querySelectorAll(config.inputSelector));
    this._buttonSubmit = this._popup.querySelector(config.submitSelector);
    this._buttonDefaultText = this._buttonSubmit.textContent
  }

  _getInputValues = () => {
    const inputValues = {};
    this._inputList.forEach( (input) => {
      inputValues[input.name.slice(6)] = input.value;
    });
    return inputValues;
  }

  _setValues = (evt) => {
    evt.preventDefault();
    this._callbackSubmit(this._getInputValues());
  }

  setEventListeners(){
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._setValues);
  }

  close(){
    super.close();
    this._popupForm.reset();
  }

  renderLoading(isLoading){ 
    if (isLoading) { 
      this._buttonSubmit.textContent = this._config.buttonSubmitLoadText;
    } else { 
      this._buttonSubmit.textContent = this._buttonDefaultText;
    } 
  }
}