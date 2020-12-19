let editFormPopup = document.querySelector('.popup');
let editFormCloseButton = document.querySelector('.popup__close');
let profileEditButton = document.querySelector('.profile__edit-button');

profileEditButton.addEventListener('click', function() { editFormPopup.classList.add('popup_opened') } );
editFormCloseButton.addEventListener('click', function() { editFormPopup.classList.remove('popup_opened') } );