import Popup from "../components/Popup.js"
import {renderLoading} from "../utils/utils.js"

export default class PopupConfirm extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._formElement = this._popup.querySelector(".popup__container_form");
    
  }

  open(cardElement, deleter) {
    super.open();
    this._deleter = deleter;
    this._cardElement = cardElement
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      renderLoading(evt.target, 'on')
      this._deleter(this._cardElement)
        .then(() => {
          this._cardElement.remove();
          super.close()
        })
        .finally(() => renderLoading(evt.target, 'reset'))
        .catch(err => close.log(err))
    });
  }
}