import Popup from "../components/Popup.js"

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupCardImage = document.querySelector(".popup__image");
    this._captionImage = document.querySelector(".popup__text");
  }
  open(name, link) {
    this._popupCardImage.src = link;
    this._popupCardImage.alt = name;
    this._captionImage.textContent = name; // подпись к большой картинке
    super.open()
  }
};