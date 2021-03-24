import Popup from "../components/Popup.js"

export default class PopupWithForm extends Popup {
  constructor(selector, submiter) {
    super(selector);
    this._submiter = submiter;
    this._placeInput = document.querySelector("#place-name"); // введенное название
    this._urlInput = document.querySelector("#place-link"); // введенный URL
    this._formElement = this._popup.querySelector(".popup__container_form");
  }

  close() {
    this._formElement.reset();
    // const nameInput = document.querySelector("#profile-name"); // введенное имя
    // const jobInput = document.querySelector("#profile-subline"); // введенный род занятий
    // const nameField = document.querySelector(".profile__name"); // текущее имя
    // const sublineField = document.querySelector(".profile__subline"); // текущий род занятий
    // nameInput.value = nameField.textContent;
    // jobInput.value = sublineField.textContent;
    // this._placeInput.value = "";
    // this._urlInput.value = "";
    super.close();
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      this._getInputValues();
      this._submiter(evt, this._formValues);
    });
  }
};