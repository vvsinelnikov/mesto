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

const closePopupButton = document.querySelectorAll('.popup__close'); // кнопка закрытия всех попаов

const nameField = document.querySelector('.profile__name'); // текущее имя
const avatar = document.querySelector('.profile__avatar'); // текущий аватар
const sublineField = document.querySelector('.profile__subline'); // текущий род занятий

const cardTemplate = document.querySelector('#card-template').content; // шаблон карточки
const cardsList = document.querySelector('.album__list');

function popupOpen(popup) { 
    nameInput.value = nameField.textContent;
    jobInput.value = sublineField.textContent;
    placeInput.value = '';
    urlInput.value = '';
    popup.classList.add('popup_opened');
}

function popupClose() { 
    editProfilePopup.classList.remove('popup_opened');
    newCardPopup.classList.remove('popup_opened');
}

editProfileButton.addEventListener('click', () => popupOpen(editProfilePopup))
addButton.addEventListener('click', () => popupOpen(newCardPopup))
closePopupButton.forEach((popup) => popup.addEventListener('click', popupClose));


function editProfileFormSubmit(evt) {
    evt.preventDefault();
    nameField.textContent = nameInput.value;
    avatar.alt = nameInput.value;
    document.title = nameInput.value;
    sublineField.textContent = jobInput.value;
    popupClose();
}

function newCardFormSubmit(evt) {
    if (evt) {evt.preventDefault();};
    const card = cardTemplate.cloneNode(true);
    card.querySelector('.card__image').src = urlInput.value;
    card.querySelector('.card__image').alt = placeInput.value;
    card.querySelector('.card__title').textContent = placeInput.value;
    card.querySelector('.card__like-button').id = placeInput.value;
    card.querySelector('.card__image').addEventListener('click', zoomImage);
    card.querySelector('.card__like-button').addEventListener('click', checkLikes);
    card.querySelector('.card__trash-button').addEventListener('click', function() {this.closest('li').remove();})
    cardsList.prepend(card); 
    let img = new Image();
    img.src = urlInput.value;
    img.onerror = function() { 
        document.querySelector('.album__list').firstElementChild.remove(); 
        alert('Файл не найден');
    };
    img.onload = function() { popupClose(); };
}

editProfileForm.addEventListener('submit', editProfileFormSubmit);
newPlaceForm.addEventListener('submit', newCardFormSubmit);

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

  initialCards.forEach(function(card) {
      placeInput.value = card.name;
      urlInput.value = card.link;
      newCardFormSubmit();
  });