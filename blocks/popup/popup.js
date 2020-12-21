let editFormPopup = document.querySelector('.popup');
let editFormCloseButton = document.querySelector('.popup__close');
let profileEditButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__container')

let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_subline');

let nameField = document.querySelector('.profile__name');
let avatar = document.querySelector('.profile__avatar');
let sublineField = document.querySelector('.profile__subline');

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

function handleFormSubmit (evt) {
    evt.preventDefault();

    nameField.textContent = nameInput.value;
    avatar.alt = nameInput.value;
    document.title = nameInput.value;
    sublineField.textContent = jobInput.value;
    popupClose();
}

formElement.addEventListener('submit', handleFormSubmit); 