function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  errorClass,
  // для проверки изменения имени (самодеятельность)
  currentName,
  currentJob,
  enteredName,
  enteredJob,
}) {
  const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  const showInputError = (formElement, inputElement, errorMessage) => {
    inputElement.classList.add(errorClass);
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
  };

  const hideInputError = (formElement, inputElement) => {
    inputElement.classList.remove(errorClass);
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = "";
  };

  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        isValid(formElement, inputElement);
        runCheckSubmit();
      });
    });

    function runCheckSubmit() {
      checkSubmitButton({
        formElement,
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        currentName,
        currentJob,
        enteredName,
        enteredJob,
      });
    }
    // задать состояние кнопки при открытии попапа
    runCheckSubmit();
  };

  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

// *** Проверка активности кнопки сохранения ***
const checkSubmitButton = ({
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  currentName,
  currentJob,
  enteredName,
  enteredJob,
}) => {
  const submitButton = formElement.querySelector(submitButtonSelector);

  function checkCurrentState(cName, eName, cJob, eJob) {
    if (cName === eName && cJob === eJob) {
      return true;
    } else {
      return false;
    }
  }
  if (
    !Array.from(formElement.querySelectorAll(inputSelector)).every(
      (element) => element.validity.valid
    ) ||
    checkCurrentState(
      currentName,
      enteredName.value,
      currentJob,
      enteredJob.value
    )
  ) {
    submitButton.setAttribute("disabled", true);
    submitButton.classList.add(inactiveButtonClass);
  } else {
    submitButton.removeAttribute("disabled");
    submitButton.classList.remove(inactiveButtonClass);
  }
};
