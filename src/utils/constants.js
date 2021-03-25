export const editProfileButton = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
export const editProfilePopupElement = document.querySelector("#edit-profile-popup"); // попап редактирования профиля
export const editProfileForm = document.querySelector("#edit-profile-form"); // форма редактирования профиля
export const nameElement = document.querySelector(".profile__name"); // имя
export const infoElement = document.querySelector(".profile__subline"); // род занятий

export const editAvatarButton = document.querySelector(".profile__edit-avatar"); // кнопка редактирования аватара
export const editAvatarPopupElement = document.querySelector("#edit-avatar-popup"); // попап редактирования аватара
export const editAvatarForm = document.querySelector("#edit-avatar-form"); // форма редактирования аватара
export const avatarImage = document.querySelector(".profile__avatar"); // изображение аватара

export const addCardButton = document.querySelector(".profile__add-button"); // кнопка добавления карточки
export const addCardPopupElement = document.querySelector("#add-card-popup"); // попап созданя карточки
export const addCardForm = document.querySelector("#add-card-form"); // форма добавления карточки

export const zoomPopupElement = document.querySelector("#zoom-popup"); // попап с крупной фото
export const confirmPopupElement = document.querySelector("#confirm-popup"); // попап с подтверждением

export const nameInput = document.querySelector("#profile-name"); // введенное имя
export const jobInput = document.querySelector("#profile-subline"); // введенный род занятий

export const cardsContainerSelector = ".album__list"; // селектор контейнера с карточками
export const cardSelector = '#card-template'; // селектор карточки
export const apiSettings = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
    headers: {
        authorization: 'b701286d-04dc-43b0-b34e-ea7babd7f4f7',
        'Content-Type': 'application/json'
    },
};
// export const myId = '4aafd4f5416e15e2bd0471ad';


".profile__name", ".profile__subline", ".profile__avatar"