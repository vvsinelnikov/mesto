let editFormPopup = document.querySelector('.popup');
let editFormCloseButton = document.querySelector('.popup__close');
let profileEditButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__body')

function popupClose() { 
    editFormPopup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', function() { editFormPopup.classList.add('popup_opened') } );
editFormCloseButton.addEventListener('click', popupClose);

function handleFormSubmit (evt) {
    evt.preventDefault();
    let nameInput = document.querySelector('input[name="name"]');
    let jobInput = document.querySelector('input[name="subline"]');

    let nameField = document.querySelector('.profile__name');
    let avatar = document.querySelector('.profile__avatar');
    let sublineField = document.querySelector('.profile__subline');

    nameField.textContent = nameInput.value;
    avatar.alt = nameInput.value;
    document.title = nameInput.value;
    sublineField.textContent = jobInput.value;
    popupClose();
}

formElement.addEventListener('submit', handleFormSubmit); 