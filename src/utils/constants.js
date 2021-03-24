export const editProfileButton = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
export const editAvatarButton = document.querySelector(".profile__edit-avatar"); // кнопка редактирования аватара
export const editProfileForm = document.querySelector("#edit-profile-form"); // форма редактирования профиля
export const editAvatarForm = document.querySelector("#edit-avatar-form"); // форма редактирования аватара
export const nameInput = document.querySelector("#profile-name"); // введенное имя
export const jobInput = document.querySelector("#profile-subline"); // введенный род занятий
export const avatar = document.querySelector(".profile__avatar"); // аватар
export const addCardButton = document.querySelector(".profile__add-button"); // кнопка добавления карточки
export const newPlaceForm = document.querySelector("#new-place-form"); // форма добавления карточки
export const apiSettings = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
    headers: {
        authorization: 'b701286d-04dc-43b0-b34e-ea7babd7f4f7',
        'Content-Type': 'application/json'
    },
};
// export const myId = '4aafd4f5416e15e2bd0471ad';