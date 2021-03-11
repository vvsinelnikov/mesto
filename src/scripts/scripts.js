import '../pages/index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {editProfileForm, nameInput, jobInput, editProfileButton, newPlaceForm, addCardButton, avatar} from "../utils/constants.js";
import {validationSettings} from "../utils/validationSettings.js";
import {initialCards} from "../utils/initialCards.js";

// Отображение профиля
const currentProfile = new UserInfo(".profile__name", ".profile__subline");
currentProfile.setUserInfo('Жак-Ив Кусто', 'Исследователь океана');

// Редактирование профиля
const editProfile = new PopupWithForm("#edit-profile-popup", (evt, inputs) => {
  evt.preventDefault();
  currentProfile.setUserInfo(inputs['input-name'], inputs['input-subline'])
  avatar.alt = inputs['input-name'];
  document.title = inputs['input-name'];
  editProfile.close();
});
editProfileButton.addEventListener("click", () => {
  nameInput.value = currentProfile.getUserInfo().name;
  jobInput.value = currentProfile.getUserInfo().info;
  editProfile.open();
  editProfileFormValid.clearValidation();
});

// Добавление карточек
const addCard = new PopupWithForm("#new-place-popup", (evt, inputs) => {
  evt.preventDefault();
  const newCard = new Section({items: [{ name: inputs['place-name'], link: inputs['place-link'] }], renderer: (item) => {
    const card = new Card(item, "#card-template", (name, link) => {
      const popupWithImage = new PopupWithImage("#zoom-popup");
      popupWithImage.open(name, link);
    });
    const cardElement = card.generateCard();
    newCard.addItem(cardElement)
    }
  }, '.album__list');  
  newCard.renderElements();
  addCard.close();
});
addCardButton.addEventListener("click", function () {
  addCard.open();
  newPlaceFormValid.clearValidation();
});

// Первые 6 карточек
const initialCardsList = new Section({items: initialCards, renderer: (item) => {
  const card = new Card(item, "#card-template", (name, link) => {
    const popupWithImage = new PopupWithImage("#zoom-popup");
    popupWithImage.open(name, link);
  });
  const cardElement = card.generateCard();
  initialCardsList.addItem(cardElement)
  }
}, '.album__list');
initialCardsList.renderElements();

// Валидация форм
const editProfileFormValid = new FormValidator(validationSettings, editProfileForm);
editProfileFormValid.enableValidation();

const newPlaceFormValid = new FormValidator(validationSettings, newPlaceForm);
newPlaceFormValid.enableValidation();
