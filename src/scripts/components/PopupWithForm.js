import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, config, {callbackSubmit}){
    super(popupSelector, config);
    this._callbackSubmit = callbackSubmit;
    this._popupForm = this._popup.querySelector(config.formSelector);
    this._inputList = Array.from(this._popupForm.querySelectorAll(config.inputSelector));
    this._buttonInput = this._popup.querySelector(config.submitSelector)
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

  renderLoading(val){
    switch (val) {
      case 'val1':
        this._buttonInput.textContent = 'Сохранение...';
        break
      case 'val2':
        this._buttonInput.textContent = 'Сохранить';
        break
      case 'val3':
        this._buttonInput.textContent = 'Создать';
        break
    }
  }
}