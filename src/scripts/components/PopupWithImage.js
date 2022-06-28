import Popup from "./Popup.js";
import {imageView, imageCaption} from '../utils/constants.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector, name, link){
    super(popupSelector);
    this._imageView = imageView;
    this._imageCaption = imageCaption;
    this._name = name;
    this._link = link;
  }

  open(){
    this._imageView.src = this._link;
    this._imageView.alt = `Фото ${this._name}`;
    this._imageCaption.textContent = this._name;
    super.open();
  }
}