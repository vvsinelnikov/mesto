const nameField = document.querySelector(".profile__name"); // текущее имя
const avatar = document.querySelector(".profile__avatar"); // текущий аватар
const sublineField = document.querySelector(".profile__subline"); // текущий род занятий

const editProfileButton = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
const editProfilePopup = document.querySelector("#edit-profile-popup"); // попап редактирования профиля
const editProfileForm = editProfilePopup.querySelector("#edit-profile-form"); // форма редактирования профиля
const nameInput = editProfilePopup.querySelector("#profile-name");
const jobInput = editProfilePopup.querySelector("#profile-subline");

editProfileButton.addEventListener("click", () => {
  nameInput.value = nameField.textContent;
  jobInput.value = sublineField.textContent;
  currentPopup = editProfilePopup;
  openPopup();
});
editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  nameField.textContent = nameInput.value;
  avatar.alt = nameInput.value;
  document.title = nameInput.value;
  sublineField.textContent = jobInput.value;
  closePopup();
});

// *** Добавление карточек ***
const addButton = document.querySelector(".profile__add-button"); // кнопка добавления карточки
const newCardPopup = document.querySelector("#new-place-popup"); // попап добавления карточки
const newPlaceForm = document.querySelector("#new-place-form"); // форма новой карточки
const placeInput = newCardPopup.querySelector("#place-name");
const urlInput = newCardPopup.querySelector("#place-link");

const cardTemplate = document.querySelector("#card-template").content; // шаблон карточки
const cardsList = document.querySelector(".album__list");

addButton.addEventListener("click", function () {
  placeInput.value = "";
  urlInput.value = "";
  currentPopup = newCardPopup;
  openPopup();
});
newPlaceForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  createCard(placeInput.value, urlInput.value);
  addCard(urlInput.value, cardContent);
});

let cardContent = "";
function createCard(place, url) {
  // создание карточки
  cardContent = cardTemplate.cloneNode(true);
  const cardImage = cardContent.querySelector(".card__image");
  const cardLikeButton = cardContent.querySelector(".card__like-button");
  cardImage.src = url;
  cardImage.alt = place;
  cardImage.addEventListener("click", zoomImage);
  cardContent.querySelector(".card__title").textContent = place;
  cardLikeButton.id = place;
  cardLikeButton.addEventListener("click", checkLikes);
  cardContent
    .querySelector(".card__trash-button")
    .addEventListener("click", function () {
      this.closest("li").remove();
    });
}

function addCard(url, cardContent) {
  // публикация карточки
  cardsList.prepend(cardContent);

  function checkUrl(url) {
    // проверка доступности файла (самодеятельность)
    let img = new Image();
    img.src = url;
    img.onerror = function () {
      // onerror работает только после публикации фрагмента в DOM и обработки браузером. Непонятно, как проверять, не публикуя
      document.querySelector(".card").remove();
      alert("Файл не найден");
    };
    img.onload = function () {
      return closePopup();
    };
  }

  checkUrl(url);
}

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

initialCards.forEach((card) => {
  // загрузка первых 6 карточек
  createCard(card.name, card.link);
  addCard(card.link, cardContent);
});

function checkLikes() {
  this.classList.toggle("card__like-button_liked");
} // запоминалка лайков

// *** Зум фотографии ***
const zoomPopup = document.querySelector("#zoom-popup"); // попап с большой картинкой
const zoomImg = zoomPopup.querySelector(".popup__image"); // большая картинка
const zoomText = zoomPopup.querySelector(".popup__text"); // подпись к большой картинке

function zoomImage() {
  zoomImg.src = this.src;
  zoomImg.alt = this.alt;
  zoomText.textContent = this.alt;
  currentPopup = zoomPopup;
  openPopup();
}

// *** Открытие и закрытие попапов ***
let currentPopup = editProfilePopup; // текущий открытый попап

function openPopup() {
  currentPopup.classList.add("popup_opened");
  // validatePopup();
  document.addEventListener("keydown", closeByEsc); // закрытие по Esc
  currentPopup.addEventListener("click", closeByClick); // Закрытие по клику на фон
  enableValidation({
    formSelector: ".popup__fields",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_inactive",
    errorClass: "popup__input_error",
    currentName: nameField.textContent,
    currentJob: sublineField.textContent,
    enteredName: nameInput,
    enteredJob: jobInput,
  });
}

function closePopup() {
  currentPopup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc); // закрытие по Esc
  currentPopup.removeEventListener("click", closeByClick); // закрытие по клику на фон
  nameInput.value = "";
  jobInput.value = "";
}
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}
function closeByClick(evt) {
  if (!currentPopup.querySelector(".popup__container").contains(evt.target)) {
    closePopup();
  }
}

function handleCloseButton() {
  Array.from(document.querySelectorAll(".popup__close")).forEach((button) => {
    button.addEventListener("click", closePopup);
  });
}

handleCloseButton();
