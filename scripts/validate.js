// *** Запуск валидации с нужными параметрами ***
const validatePopup = () => {
  enableValidation({
    formSelector: "#" + currentPopup.id,
    inputSelector: ".popup__fields",
    inputErrorClass: "popup__input_error",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_inactive",
    currentName: nameField.textContent,
    currentJob: sublineField.textContent,
    enteredName: nameInput,
    enteredJob: jobInput,
  });
};

// *** Проверка полей ***
const enableValidation = ({
  formSelector, // для работы достаточно только этого элемента
  inputSelector, // используется универсальная проверка всех полей
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass, // не используется (используется конструктор для id)
  // для проверки изменения имени (самодеятельность)
  currentName,
  currentJob,
  enteredName,
  enteredJob,
}) => {
  const form = document.querySelector(formSelector);
  if (!form.querySelector(inputSelector)) {
    return;
  } // остановка, если попап без полей (с фотографией)
  const inputFields = Array.from(
    form.querySelector(inputSelector).elements
  ).filter((input) => input.type !== "submit");
  inputFields.forEach((element) => {
    // для каждого поля формы, кроме submit, выводить и скрывать ошибки
    if (!element.validity.valid) {
      element.classList.add(inputErrorClass);
      form.querySelector(`#${element.id}-error`).textContent =
        element.validationMessage;
    } else {
      element.classList.remove(inputErrorClass);
      form.querySelector(`#${element.id}-error`).textContent = "";
    }
  });
  checkSubmitButton({
    form,
    submitButtonSelector,
    inactiveButtonClass,
    inputFields,
    currentName,
    currentJob,
    enteredName,
    enteredJob,
  });
};

// *** Проверка активности кнопки сохранения ***
const checkSubmitButton = ({
  form,
  submitButtonSelector,
  inactiveButtonClass,
  inputFields,
  currentName,
  currentJob,
  enteredName,
  enteredJob,
}) => {
  const submitButton = form.querySelector(submitButtonSelector);
  function checkCurrentState(cName, eName, cJob, eJob) {
    if (cName === eName && cJob === eJob) {
      return true;
    } else {
      return false;
    }
  }
  if (
    !inputFields.every((element) => element.validity.valid) ||
    checkCurrentState(currentName, enteredName.value, currentJob, enteredJob.value)
  ) {
    submitButton.setAttribute("disabled", true);
    submitButton.classList.add(inactiveButtonClass);
  } else {
    submitButton.removeAttribute("disabled");
    submitButton.classList.remove(inactiveButtonClass);
  }
};