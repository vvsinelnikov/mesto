export default class FormValidator {
  constructor(
    { inputSelector, submitButtonSelector, inactiveButtonClass, errorClass },
    formElement
  ) {
    this._formElement = formElement;
    this._inputSelector = inputSelector;
    this._submitButton = formElement.querySelector(submitButtonSelector);
    this._inactiveButtonClass = inactiveButtonClass;
    this._errorClass = errorClass;
  }

  enableValidation() {
    this._inputsList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => this._isValid(inputElement));
    });
    this.checkSubmitButton();
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
    this.checkSubmitButton();
  }

  _showInputError(inputElement) {
    inputElement.classList.add(this._errorClass);
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._errorClass);
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = "";
  }

  checkSubmitButton() {
    if (!this._inputsList.every((element) => element.validity.valid)) {
      this._submitButton.setAttribute("disabled", true);
      this._submitButton.classList.add(this._inactiveButtonClass);
    } else {
      this._submitButton.removeAttribute("disabled");
      this._submitButton.classList.remove(this._inactiveButtonClass);
    }
  }

  clearValidation() {
    this._inputsList.forEach((element) => this._hideInputError(element));
    this.checkSubmitButton();
  }
}
