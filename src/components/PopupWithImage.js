import Popup from "../components/Popup.js"

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupCardImage = popupElement.querySelector(".popup__image");
    this._captionImage = popupElement.querySelector(".popup__text");
  }
  open(name, link) {
    this._popupCardImage.src = link;
    this._popupCardImage.alt = name;
    this._captionImage.textContent = name; // подпись к большой картинке
    super.open()
  }
};