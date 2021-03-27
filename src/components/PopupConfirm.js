import Popup from "../components/Popup.js"
import {renderLoading} from "../utils/utils.js"

export default class PopupConfirm extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._formElement = this._popup.querySelector(".popup__container_form");
    
  }

  open(cardElement, deleteCardHandler) {
    super.open();
    this._deleteCardHandler = deleteCardHandler;
    this._cardElement = cardElement
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._deleteCardHandler(this)
        // .then(this.close)
        // .catch(err => console.log(err))
    });
  }
}