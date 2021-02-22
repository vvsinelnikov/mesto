const addEventListeners = (function () {
  const editProfilePopup = document.querySelector("#edit-profile-popup"); // попап редактирования профиля
  const nameField = document.querySelector(".profile__name"); // текущее имя
  const sublineField = document.querySelector(".profile__subline"); // текущий род занятий
  const nameInput = editProfilePopup.querySelector("#profile-name"); // введенное имя
  const jobInput = editProfilePopup.querySelector("#profile-subline"); // введенный род занятий

  document
    .querySelector(".profile__edit-button")
    .addEventListener("click", () => {
      nameInput.value = nameField.textContent;
      jobInput.value = sublineField.textContent;
      openPopup(editProfilePopup);
    });

  const editProfileForm = editProfilePopup.querySelector("#edit-profile-form"); // форма редактирования профиля
  editProfileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    nameField.textContent = nameInput.value;
    document.querySelector(".profile__avatar").alt = nameInput.value;
    document.title = nameInput.value;
    sublineField.textContent = jobInput.value;
    closePopup(editProfilePopup);
  });
  editProfilePopup
    .querySelector("#profile-close-button")
    .addEventListener("click", () => {
      closePopup(editProfilePopup);
    });

  const newCardPopup = document.querySelector("#new-place-popup"); // попап добавления карточки
  const placeInput = newCardPopup.querySelector("#place-name"); // введенное название
  const urlInput = newCardPopup.querySelector("#place-link"); // введенный URL
  document
    .querySelector(".profile__add-button")
    .addEventListener("click", function () {
      placeInput.value = "";
      urlInput.value = "";
      openPopup(newCardPopup);
    });
  newCardPopup
    .querySelector("#place-close-button")
    .addEventListener("click", () => {
      closePopup(newCardPopup);
    });

  document
    .querySelector("#new-place-form")
    .addEventListener("submit", function (evt) {
      evt.preventDefault();
      const card = new Card(
        { name: placeInput.value, link: urlInput.value },
        "#card-template",
        openPopup
      );
      const cardElement = card.generateCard();
      document.querySelector(".album__list").prepend(cardElement);
      // card.checkUrl(); // по заданию может быть только один публичный метод
      closePopup(newCardPopup);
    });

  const zoomPopup = document.querySelector("#zoom-popup"); // попап крупной фото
  zoomPopup
    .querySelector("#zoom-close-button")
    .addEventListener("click", () => {
      closePopup(zoomPopup);
    });
})();

const openPopup = (currentPopup) => {
  currentPopup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc(currentPopup)); // закрытие по Esc
  currentPopup.addEventListener("click", closeByClick(currentPopup)); // Закрытие по клику на фон
  const valid = new FormValidator(
    {
      formSelector:
        "#" + currentPopup.querySelector(".popup__container_form").id, // "#edit-profile-form"
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__submit-button",
      inactiveButtonClass: "popup__submit-button_inactive",
      errorClass: "popup__input_error",
    },
    currentPopup
  );
  valid.enableValidation();
};

function closePopup(currentPopup) {
  currentPopup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc); // закрытие по Esc
  currentPopup.removeEventListener("click", closeByClick); // закрытие по клику на фон
}

const closeByEsc = (currentPopup) => (evt) => {
  if (evt.key === "Escape") {
    closePopup(currentPopup);
  }
};

const closeByClick = (currentPopup) => (evt) => {
  if (!currentPopup.querySelector(".popup__container").contains(evt.target)) {
    closePopup(currentPopup);
  }
};

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

import Card from "./Card.js";

initialCards.forEach((item) => {
  const card = new Card(item, "#card-template", openPopup);
  const cardElement = card.generateCard();
  document.querySelector(".album__list").prepend(cardElement);
  // проверка доступности файла (самодеятельность)
  // onerror работает только после публикации фрагмента в DOM и обработки браузером. Непонятно, как проверять, не публикуя
  // card.checkUrl(); // по заданию может быть только один публичный метод
});

import FormValidator from "./FormValidator.js";
