// *** Запуск валидации с нужными параметрами ***
const validatePopup = () => {
    enableValidation({
    formSelector: '#' + currentPopup.id, // для работы достаточно только этого элемента
    inputSelector: '.popup__fields',
    inputErrorClass: 'popup__input_error',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    })
}

// *** Проверка полей *** 
const enableValidation = ({ 
    formSelector = '',
    inputSelector = '', // используется универсальная проверка всех полей
    submitButtonSelector = '',
    inactiveButtonClass = '',
    inputErrorClass = '',
    errorClass = '', // не используется (используется конструктор для id)
  }) => {   
    const form = document.querySelector(formSelector);
    if (!form.querySelector(inputSelector)) { return } // остановка, если попап без полей (с фотографией)
    const inputFields = Array.from(form.querySelector(inputSelector).elements).filter(input => input.type !== 'submit');
    inputFields.forEach((element) => { // для каждого поля формы, кроме submit, выводить и скрывать ошибки
      if (!element.validity.valid) {
        element.classList.add(inputErrorClass)
        document.querySelector(`#${element.id}-error`).textContent = element.validationMessage
      }
      else {
        element.classList.remove(inputErrorClass)
        document.querySelector(`#${element.id}-error`).textContent = ""
      }
    })
    checkSubmitButton(form, submitButtonSelector, inactiveButtonClass, inputFields, formSelector);
  }
  
  // *** Проверка активности кнопки сохранения *** 
  function checkSubmitButton(form, submitButtonSelector, inactiveButtonClass, inputFields, formSelector) { 
    const submitButton = form.querySelector(submitButtonSelector)
    if (!inputFields.every((element) => element.validity.valid) || (formSelector === '#edit-profile-popup' && (nameInput.value === nameField.textContent && jobInput.value === sublineField.textContent))) {
      submitButton.setAttribute('disabled', true);
      submitButton.classList.add(inactiveButtonClass);
    }
    else {
      submitButton.removeAttribute('disabled');
      submitButton.classList.remove(inactiveButtonClass);
    }
  }