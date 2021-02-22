export default class FormValidator {
  constructor(
    {
      formSelector,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      errorClass,
    },
    formElement
  ) {
    this._formElement = document.querySelector(formSelector);
    this._inputSelector = inputSelector;
    this._submitButton = formElement.querySelector(submitButtonSelector);
    this._inactiveButtonClass = inactiveButtonClass;
    this._errorClass = errorClass;
  }

  enableValidation() {
    Array.from(this._formElement.querySelectorAll(this._inputSelector)).forEach(
      (inputElement) => {
        inputElement.addEventListener("input", () =>
          this._isValid(inputElement)
        );
      }
    );
    this._checkSubmitButton();
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
    this._checkSubmitButton();
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

  _checkSubmitButton() {
    if (
      !Array.from(
        this._formElement.querySelectorAll(this._inputSelector)
      ).every((element) => element.validity.valid)
    ) {
      this._submitButton.setAttribute("disabled", true);
      this._submitButton.classList.add(this._inactiveButtonClass);
    } else {
      this._submitButton.removeAttribute("disabled");
      this._submitButton.classList.remove(this._inactiveButtonClass);
    }
  }
}
