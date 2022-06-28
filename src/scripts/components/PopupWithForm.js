import Popup from "./Popup.js";
import { validConfig } from "../utils/constants.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, {callbackSubmit}){
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._popupForm = this._popup.querySelector(validConfig.formSelector);
    this._inputList = Array.from(this._popup.querySelectorAll(validConfig.inputSelector));
  }

  _getInputValues = () => {
    const inputValues = {};
    this._inputList.forEach( (input) => {
      inputValues[input.name.slice(6)] = input.value;
    });
    // console.log(inputValues);
    return inputValues;
  }

  _setValues = (evt) => {
    evt.preventDefault();
    this._callbackSubmit(this._getInputValues());
    this.close();
  }

  setEventListeners(){
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._setValues);
  }

  close(){
    super.close();
    this._popupForm.reset();
    this._popupForm.removeEventListener('submit', this._setValues);
  }
}