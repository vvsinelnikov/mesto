import Popup from "../components/Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupElement, submiter) {
    super(popupElement);
    this._submiter = submiter;
    this._formElement = this._popup.querySelector(".popup__container_form");
  }

  close() {
    this._formElement.reset();
    super.close();
  }

  _getInputValues() {
    const formValues = {};    
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._inputList.forEach(input => formValues[input.name] = input.value);
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      this._getInputValues();
      this._submiter(evt, this._getInputValues());
    });
  }
};