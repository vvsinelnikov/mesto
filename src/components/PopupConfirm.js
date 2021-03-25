import Popup from "../components/Popup.js"

export default class PopupConfirm extends Popup {
  constructor(popupElement, deleter) {
    super(popupElement);
    this._formElement = this._popup.querySelector(".popup__container_form");
    this._deleter = deleter;
  }

  open(cardElement) {
    super.open();
    this._cardElement = cardElement
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._cardElement.remove();
      this._deleter
      super.close();
    });
  }
}