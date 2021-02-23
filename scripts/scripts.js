import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const cardList = document.querySelector(".album__list"); // список карточек

// *** Добавляем слушателей ***
const editProfilePopup = document.querySelector("#edit-profile-popup"); // попап редактирования профиля
const editProfileForm = editProfilePopup.querySelector("#edit-profile-form"); // форма редактирования профиля
const nameField = document.querySelector(".profile__name"); // текущее имя
const sublineField = document.querySelector(".profile__subline"); // текущий род занятий
const nameInput = editProfilePopup.querySelector("#profile-name"); // введенное имя
const jobInput = editProfilePopup.querySelector("#profile-subline"); // введенный род занятий

const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", () => {
  nameInput.value = nameField.textContent;
  jobInput.value = sublineField.textContent;
  openPopup(editProfilePopup);
  editProfileFormValid.clearValidation();
  editProfileFormValid.checkSubmitButton();
});

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  nameField.textContent = nameInput.value;
  document.querySelector(".profile__avatar").alt = nameInput.value;
  document.title = nameInput.value;
  sublineField.textContent = jobInput.value;
  closePopup(editProfilePopup);
});

const profileCloseButton = editProfilePopup.querySelector(
  "#profile-close-button"
);
profileCloseButton.addEventListener("click", () => {
  closePopup(editProfilePopup);
});

const newCardPopup = document.querySelector("#new-place-popup"); // попап добавления карточки
const newPlaceForm = newCardPopup.querySelector("#new-place-form"); // форма добавления карточки
const placeInput = newCardPopup.querySelector("#place-name"); // введенное название
const urlInput = newCardPopup.querySelector("#place-link"); // введенный URL
const addCardButton = document.querySelector(".profile__add-button");
addCardButton.addEventListener("click", function () {
  placeInput.value = "";
  urlInput.value = "";
  openPopup(newCardPopup);
  newPlaceFormValid.clearValidation();
  newPlaceFormValid.checkSubmitButton();
});

const placeCloseButton = newCardPopup.querySelector("#place-close-button");
placeCloseButton.addEventListener("click", () => {
  closePopup(newCardPopup);
});

newPlaceForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const card = new Card(
    { name: placeInput.value, link: urlInput.value },
    "#card-template",
    openImagePopup
  );
  const cardElement = card.generateCard();
  document.querySelector(".album__list").prepend(cardElement);
  closePopup(newCardPopup);
});

const zoomPopup = document.querySelector("#zoom-popup"); // попап крупной фото
zoomPopup.querySelector("#zoom-close-button").addEventListener("click", () => {
  closePopup(zoomPopup);
});
// *** Слушатели добавлены ***

const openPopup = (currentPopup) => {
  currentPopup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc(currentPopup)); // закрытие по Esc
  currentPopup.addEventListener("click", closeByClick(currentPopup)); // Закрытие по клику на фон
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

function generateCard(item) {
  const card = new Card(item, "#card-template", openImagePopup);
  return card.generateCard();
}

initialCards.forEach((item) => {
  cardList.prepend(generateCard(item));
});

function openImagePopup(name, link) {
  const zoomPopup = document.querySelector("#zoom-popup"); // попап с большой картинкой
  zoomPopup.querySelector(".popup__image").src = link;
  zoomPopup.querySelector(".popup__image").alt = name;
  zoomPopup.querySelector(".popup__text").textContent = name; // подпись к большой картинке
  openPopup(zoomPopup);
}

function enableValidation(form) {
  const valid = new FormValidator(
    {
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__submit-button",
      inactiveButtonClass: "popup__submit-button_inactive",
      errorClass: "popup__input_error",
    },
    form
  );
  valid.enableValidation();
}

const editProfileFormValid = new FormValidator(
  {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_inactive",
    errorClass: "popup__input_error",
  },
  editProfileForm
);
editProfileFormValid.enableValidation();

const newPlaceFormValid = new FormValidator(
  {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_inactive",
    errorClass: "popup__input_error",
  },
  newPlaceForm
);
newPlaceFormValid.enableValidation();
