function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  errorClass,
}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(
      formElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      errorClass
    );
    Array.from(formElement.querySelectorAll(inputSelector)).forEach(
      (inputElement) => {
        checkSubmitButton(
          formElement,
          inputSelector,
          submitButtonSelector,
          inactiveButtonClass
        );
        hideInputError(inputElement, errorClass);
      }
    );
  });
}

const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  errorClass
) => {
  Array.from(formElement.querySelectorAll(inputSelector)).forEach(
    (inputElement) => {
      inputElement.addEventListener("input", () =>
        isValid(
          formElement,
          inputSelector,
          inputElement,
          submitButtonSelector,
          inactiveButtonClass,
          errorClass,
          inputSelector
        )
      );
    }
  );
};

const isValid = (
  formElement,
  inputSelector,
  inputElement,
  submitButtonSelector,
  inactiveButtonClass,
  errorClass
) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorClass);
  } else {
    hideInputError(inputElement, errorClass);
  }
  checkSubmitButton(
    formElement,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass
  );
};

const showInputError = (inputElement, errorClass) => {
  inputElement.classList.add(errorClass);
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (inputElement, errorClass) => {
  inputElement.classList.remove(errorClass);
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = "";
};

const checkSubmitButton = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass
) => {
  const submitButton = formElement.querySelector(submitButtonSelector);
  if (
    !Array.from(formElement.querySelectorAll(inputSelector)).every(
      (element) => element.validity.valid
    )
  ) {
    submitButton.setAttribute("disabled", true);
    submitButton.classList.add(inactiveButtonClass);
  } else {
    submitButton.removeAttribute("disabled");
    submitButton.classList.remove(inactiveButtonClass);
  }
};
