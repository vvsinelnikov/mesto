import '../pages/index.css';
import {editProfileForm, nameInput, jobInput, editProfileButton, editAvatarForm, editAvatarButton, newPlaceForm, addCardButton, avatar, apiSettings} from "../utils/constants.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirm from "../components/PopupConfirm.js"
import UserInfo from "../components/UserInfo.js";
import UrlValidator from '../components/UrlValidator';
import FormValidator from "../components/FormValidator.js";
import {validationSettings} from "../utils/validationSettings.js";

const api = new Api(apiSettings);
const urlValidator = new UrlValidator();
const initialCardsList = new Section('.album__list'); // массив карточек

// Отображение профиля
const currentProfile = new UserInfo(".profile__name", ".profile__subline", ".profile__avatar");

let myId = '';
api.getMyInfo()
  .then((res) => {
    myId = res._id; // кэшируем мой ID
    currentProfile.setUserInfo(res.name, res.about);
    currentProfile.setAvatar(res.avatar);
  }); 

// Редактирование профиля
const editProfile = new PopupWithForm("#edit-profile-popup", (evt, inputs) => {
  evt.preventDefault();
  const popupSubmitButton = evt.target.querySelector(".popup__submit-button");
  popupSubmitButton.value = 'Сохранение...';
  api.updateProfile(inputs['input-name'], inputs['input-subline'])
    .then(() => {
      currentProfile.setUserInfo(inputs['input-name'], inputs['input-subline'])
      avatar.alt = inputs['input-name'];
      document.title = inputs['input-name'];
      editProfile.close();
      popupSubmitButton.value = 'Сохранить';
    })
    .catch(err => console.log('api.updateProfile ' + err))
});
editProfile.setEventListeners();
editProfileButton.addEventListener("click", () => {
  const userData = currentProfile.getUserInfo();
  nameInput.value = userData.name; // улучшение UX
  jobInput.value = userData.info; // улучшение UX
  editProfile.open();
  editProfileFormValid.clearValidation();
});

// Редактирование аватара
const editAvatar = new PopupWithForm("#avatar-popup", (evt, inputs) => {
  evt.preventDefault();
  const popupSubmitButton = evt.target.querySelector(".popup__submit-button");
  popupSubmitButton.value = 'Сохранение...';
  urlValidator.checkElement({link: inputs['avatar-url']})
    .then(api.updateAvatar(inputs['avatar-url']))
    .then(res => {
      currentProfile.setAvatar(res.link)
      editAvatar.close()
      popupSubmitButton.value = 'Сохранить'})
    .catch(err => alert(err))
});
editAvatar.setEventListeners();
editAvatarButton.addEventListener("click", () => {
  editAvatar.open();
  editProfileFormValid.clearValidation();
});

// **************************************************************************
// Загрузка карточек
const popupConfirm = new PopupConfirm('#confirm-popup');
popupConfirm.setEventListeners()

function createCard(item) {
  const card = new Card(api, myId, item,
    (name, link) => popupWithImage.open(name, link), // handleCardClick
    cardElement => popupConfirm.open(cardElement, card.delete()) // handleDeleteClick
  );
  return card.generateCard();
}

api.getInitialCards()
  .then(res => res.forEach(item => loadCard(item)))
  .catch(err => console.log('api.getInitialCards ' + err))

function loadCard(item) {
  urlValidator.checkElement(item) // не загружаем карточки с битыми картинками
  .then(item => createCard(item))
  .then(item => initialCardsList.addItem(item))
  .catch(err => console.log('loadCard ' + err))
};

function publishCard(item, evt) {
  evt.target.querySelector(".popup__submit-button").value = 'Сохранение...';
  return urlValidator.checkElement(item) // проверяем введенный URL
  .then(item => api.postCard(item))
  .then(item => createCard(item))
  .then(item => {
    initialCardsList.addItem(item);
  })
  .catch(err => alert(err))
};

// Добавление карточек
const addCard = new PopupWithForm("#new-place-popup", (evt, inputs) => {
  evt.preventDefault();
  publishCard({name: inputs['place-name'], link: inputs['place-link'], likes: 0}, evt)
    .then(() => {
      evt.target.querySelector(".popup__submit-button").value = 'Сохранение...';
      addCard.close()});
});
addCard.setEventListeners();
addCardButton.addEventListener("click", function () {
  addCard.open();
  newPlaceFormValid.clearValidation();
});

// **************************************************************************
// Попап с фото
const popupWithImage = new PopupWithImage("#zoom-popup");
popupWithImage.setEventListeners();

// Попап с подтверждением
// const popupConfirm = new PopupWithForm("#confirm-popup");

// Валидация форм
const editProfileFormValid = new FormValidator(validationSettings, editProfileForm);
editProfileFormValid.enableValidation();

const editAvatarFormValid = new FormValidator(validationSettings, editAvatarForm);
editAvatarFormValid.enableValidation();

const newPlaceFormValid = new FormValidator(validationSettings, newPlaceForm);
newPlaceFormValid.enableValidation();
