import Popup from "../components/Popup.js"

export default class PopupWithForm extends Popup {
  constructor(selector, submiter) {
    super(selector);
    this._submiter = submiter;
  }

  close() {
    super.close();
    const nameInput = document.querySelector("#profile-name"); // введенное имя
    const jobInput = document.querySelector("#profile-subline"); // введенный род занятий
    const nameField = document.querySelector(".profile__name"); // текущее имя
    const sublineField = document.querySelector(".profile__subline"); // текущий род занятий
    nameInput.value = nameField.textContent;
    jobInput.value = sublineField.textContent;
    const placeInput = document.querySelector("#place-name"); // введенное название
    const urlInput = document.querySelector("#place-link"); // введенный URL
    placeInput.value = "";
    urlInput.value = "";
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      this._getInputValues();
      this._submiter(evt, this._formValues);
    });
  }
};