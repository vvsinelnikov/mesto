const editFormPopup = document.querySelector('.popup');
const editFormCloseButton = document.querySelector('.popup__close');
const profileEditButton = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__container')

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_subline');

const nameField = document.querySelector('.profile__name');
const avatar = document.querySelector('.profile__avatar');
const sublineField = document.querySelector('.profile__subline');

function popupOpen() { 
    nameInput.value = nameField.textContent;
    jobInput.value = sublineField.textContent;
    editFormPopup.classList.add('popup_opened');
}

function popupClose() { 
    editFormPopup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', popupOpen);
editFormCloseButton.addEventListener('click', popupClose);

function handleFormSubmit(evt) {
    evt.preventDefault();

    nameField.textContent = nameInput.value;
    avatar.alt = nameInput.value;
    document.title = nameInput.value;
    sublineField.textContent = jobInput.value;
    popupClose();
}

formElement.addEventListener('submit', handleFormSubmit); 