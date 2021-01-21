const editProfileButton = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля 
const editProfilePopup = document.querySelector('#edit-profile-popup'); // попап редактирования профиля 
const editProfileForm = document.querySelector('#edit-profile-form') // форма редактирования профиля
const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
const jobInput = editProfilePopup.querySelector('.popup__input_type_subline');

const addButton = document.querySelector('.profile__add-button'); // кнопка добавления карточки
const newCardPopup = document.querySelector('#new-place-popup'); // попап добавления карточки
const newPlaceForm = document.querySelector('#new-place-form') // форма новой карточки
const placeInput = newCardPopup.querySelector('.popup__input_type_name');
const urlInput = newCardPopup.querySelector('.popup__input_type_subline');

const closeButtonList = document.querySelectorAll('.popup__close'); // кнопка закрытия всех попаов

const nameField = document.querySelector('.profile__name'); // текущее имя
const avatar = document.querySelector('.profile__avatar'); // текущий аватар
const sublineField = document.querySelector('.profile__subline'); // текущий род занятий

const cardTemplate = document.querySelector('#card-template').content; // шаблон карточки
const cardsList = document.querySelector('.album__list');

const zoomPopup = document.querySelector('.popup_zoom'); // попап с большой картинкой
const zoomImg = zoomPopup.querySelector('.popup__image'); // большая картинка
const zoomText = zoomPopup.querySelector('.popup__text'); // подпись к большой картинке

openPopup = (popup) => popup.classList.add('popup_opened');
closePopup = (popup) => popup.classList.remove('popup_opened');

function zoomImage() {
  zoomImg.src = this.src;
  zoomImg.alt = this.alt;
  zoomText.textContent = this.alt;
  openPopup(zoomPopup);
};

editProfileButton.addEventListener('click', function() {
  nameInput.value = nameField.textContent;
  jobInput.value = sublineField.textContent;
  openPopup(editProfilePopup);
})

addButton.addEventListener('click', function() {
  placeInput.value = '';
  urlInput.value = '';
  openPopup(newCardPopup);
})

function editProfileFormSubmit(evt) {
  evt.preventDefault();
  nameField.textContent = nameInput.value;
  avatar.alt = nameInput.value;
  document.title = nameInput.value;
  sublineField.textContent = jobInput.value;
  closePopup(editProfilePopup);
}

let cardContent;
function createCard(place, url) {
  cardContent = cardTemplate.cloneNode(true);
  const cardImage = cardContent.querySelector('.card__image');
  const cardLikeButton = cardContent.querySelector('.card__like-button');
  cardImage.src = url;
  cardImage.alt = place;
  cardImage.addEventListener('click', zoomImage);
  cardContent.querySelector('.card__title').textContent = place;
  cardLikeButton.id = place;
  cardLikeButton.addEventListener('click', checkLikes);
  cardContent.querySelector('.card__trash-button').addEventListener('click', function() {this.closest('li').remove();})
}

function addCard(url, cardContent) {
  cardsList.prepend(cardContent); 
  let img = new Image();
  img.src = url;
  img.onerror = function() { 
      document.querySelector('.card').remove(); 
      alert('Файл не найден');
    };
  img.onload = function() { closePopup(newCardPopup); };
};

editProfileForm.addEventListener('submit', editProfileFormSubmit);

newPlaceForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  createCard(placeInput.value, urlInput.value);
  addCard(urlInput.value, cardContent);
});

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  initialCards.forEach((card) => {
    createCard(card.name, card.link);
    addCard(card.link, cardContent);
  });

  zoomPopup.querySelector('.popup__image').addEventListener('click', zoomImage);

  zoomPopup.querySelector('.popup__close').addEventListener('click', () => closePopup(zoomPopup));
  editProfilePopup.querySelector('.popup__close').addEventListener('click', () => closePopup(editProfilePopup));
  newCardPopup.querySelector('.popup__close').addEventListener('click', () => closePopup(newCardPopup));

  function checkLikes() {this.classList.toggle('card__like-button_liked');}; // заплминалка лайков