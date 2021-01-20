const liked = []; // объект с лайками карточек

function checkLikes() {
    let cardName = this.previousElementSibling.textContent;
    if (!liked[cardName]) {
        liked[cardName] = true;
    }
    else {
        liked[cardName] = false;
    }
    this.classList.toggle('card__like-button_liked');
};

// этот код нужен только для карточек, прописанных в html
// const likeButton = document.querySelectorAll('.card__like-button');
// likeButton.forEach((cardNumber) => cardNumber.addEventListener('click', checkLikes));
