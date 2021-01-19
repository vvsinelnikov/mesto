const likeButton = document.querySelectorAll('.card__like-button');
const liked = []; // объект с лайками карточек

function checkLikes() {
    let cardName = this.previousElementSibling.textContent;
    if (!liked[cardName]) {
        liked[cardName] = true;
    }
    else {
        liked[cardName] = false;
    }
    // console.log(this.previousElementSibling.textContent + ' ' + liked[this.previousElementSibling.textContent]);
    this.classList.toggle('card__like-button_liked');
};

likeButton.forEach(function(cardNumber) {
    cardNumber.addEventListener('click', checkLikes )
});