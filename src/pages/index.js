import '../pages/index.css';
import {
  editProfileButton, 
  editProfilePopupElement, 
  editProfileForm, 
  nameElement, 
  infoElement, 
  editAvatarButton, 
  editAvatarPopupElement, 
  editAvatarForm, 
  avatarImage, 
  addCardButton, 
  addCardPopupElement, 
  addCardForm, 
  zoomPopupElement, 
  confirmPopupElement, 
  nameInput, 
  jobInput, 
  cardsContainerSelector, 
  cardSelector, 
  apiSettings
  } from "../utils/constants.js";
import {renderLoading, likeCard, dislikeCard} from "../utils/utils.js";
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

// Отображение профиля
const currentProfile = new UserInfo(nameElement, infoElement, avatarImage);

let myId = '';
const myInfo = api.getMyInfo()
  .then((res) => {
    myId = res._id; // кэшируем мой ID
    currentProfile.setUserInfo(res.name, res.about, res.avatar);
    currentProfile.setAvatar(res.avatar)
  })
  .catch(err => console.log('api.getMyInfo ' + err))

// Редактирование профиля
const editProfilePopup = new PopupWithForm(editProfilePopupElement, (evt, inputs) => {
  evt.preventDefault();
  renderLoading(evt.target, 'on');
  api.updateProfile(inputs['input-name'], inputs['input-subline'])
    .then(() => {
      currentProfile.setUserInfo(inputs['input-name'], inputs['input-subline'])
      avatarImage.alt = inputs['input-name'];
      document.title = inputs['input-name'];
      editProfilePopup.close();
    })
    .finally(() => renderLoading(evt.target, 'reset'))
    .catch(err => console.log('api.updateProfile ' + err))
});
editProfilePopup.setEventListeners();
editProfileButton.addEventListener("click", () => {
  const userData = currentProfile.getUserInfo();
  nameInput.value = userData.name; // улучшение UX
  jobInput.value = userData.info; // улучшение UX
  editProfilePopup.open();
  editProfileFormValid.clearValidation();
});

// Редактирование аватара
const editAvatarPopup = new PopupWithForm(editAvatarPopupElement, (evt, inputs) => {
  evt.preventDefault();
  renderLoading(evt.target, 'on');
  urlValidator.checkElement({link: inputs['avatar-url']})
    .then(api.updateAvatar(inputs['avatar-url']))
    .then(res => {
      currentProfile.setAvatar(res.link)
      editAvatarPopup.close()})
    .finally(() => renderLoading(evt.target, 'reset'))
    .catch(err => alert(err))
});
editAvatarPopup.setEventListeners();
editAvatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
  editProfileFormValid.clearValidation();
});

// **************************************************************************
// Загрузка карточек
const confirmPopup = new PopupConfirm(confirmPopupElement);
confirmPopup.setEventListeners()

const initialCardsList = new Section(cardsContainerSelector, (item) => {
  urlValidator.checkElement(item) // не загружаем карточки с битыми картинками
  .then(item => createCard(item))
  .then(item => initialCardsList.addItem(item))
  .catch(err => console.log('initialCardsList ' + err))
});

const loadPromises = [myInfo, initialCardsList]
Promise.all(loadPromises)
  .then(() => api.getInitialCards())
  .then(res => {
    // const myCards = new Array
    // res.forEach(element => {
    //   if (element.owner._id == myId) {
    //     myCards.push(element)
    //     res.splice(res.indexOf(element), 1)
    //   }
    // });
    // const cardsOrdered = res.concat(myCards)
    initialCardsList.renderElements(res.reverse())})
  .catch(err => console.log('loadPromises ' + err))

function createCard(item) {
  const card = new Card(api, myId, cardSelector, item,
    // handleCardClick
    (name, link) => zoomPopup.open(name, link), 
    // handleLike
    (element, cardObj) => {
      likeCard(element, cardObj)
      api.cardLike(item._id)
        .catch(err => {
          dislikeCard(element, cardObj);
          console.log('cardLike ' + err)})
        },
    // handleDislike
    (element, cardObj) => {
      dislikeCard(element, cardObj)
      api.cardDislike(item._id)
        .catch(err => {
          likeCard(element, cardObj);
          console.log('cardDislike ' + err)
        })
    },
    // handleDeleteClick
    element => confirmPopup.open(element, (confirmPopup) => {
      renderLoading(confirmPopup._formElement, 'on');
      api.deleteCard(item._id)
        .then(() => {
          confirmPopup._cardElement.remove()
          confirmPopup.close()
        })
        .finally(() => renderLoading(confirmPopup._formElement, 'reset'))
        .catch(err => console.log('deleteCard ' + err))
    })
  );
  return card.generateCard();
}

function publishCard(item, evt) {
  renderLoading(evt.target, 'on');
  return urlValidator.checkElement(item) // проверяем введенный URL
  .then(item => api.postCard(item)).catch(err => console.log(err))
  .then(item => createCard(item))
  .then(item => initialCardsList.addItem(item))
  .catch(err => alert(err));
};

// Добавление карточек
const addCardPopup = new PopupWithForm(addCardPopupElement, (evt, inputs) => {
  evt.preventDefault();
  publishCard({name: inputs['place-name'], link: inputs['place-link'], likes: 0}, evt)
    .then(() => {
      addCardPopup.close()})
    .finally(() => renderLoading(evt.target, 'reset'))
    .catch(err => alert(err));
});
addCardPopup.setEventListeners();
addCardButton.addEventListener("click", function () {
  addCardPopup.open();
  addCardFormValid.clearValidation();
});

// **************************************************************************
// Попап с фото
const zoomPopup = new PopupWithImage(zoomPopupElement);
zoomPopup.setEventListeners();

// Валидация форм
const editProfileFormValid = new FormValidator(validationSettings, editProfileForm);
editProfileFormValid.enableValidation();

const editAvatarFormValid = new FormValidator(validationSettings, editAvatarForm);
editAvatarFormValid.enableValidation();

const addCardFormValid = new FormValidator(validationSettings, addCardForm);
addCardFormValid.enableValidation();
