import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector, config){
    super(popupSelector, config);
    this._imageView = this._popup.querySelector(config.imageViewSelector);
    this._imageCaption = this._popup.querySelector(config.imageCaptionSelector);
  }

  open(name, link){
    this._name = name;
    this._link = link;
    this._imageView.src = this._link;
    this._imageView.alt = `Фото ${this._name}`;
    this._imageCaption.textContent = this._name;
    super.open();
  }
}