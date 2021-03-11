import Popup from "../components/Popup.js"

export default class PopupWithImage extends Popup {
  open(name, link) {
    this._popup.querySelector(".popup__image").src = link;
    this._popup.querySelector(".popup__image").alt = name;
    this._popup.querySelector(".popup__text").textContent = name; // подпись к большой картинке
    super.open()
  }
};