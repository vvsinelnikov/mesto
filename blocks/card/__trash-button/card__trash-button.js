const trashButton = document.querySelectorAll('.card__trash-button');

trashButton.forEach(function(cardNumber) {
    cardNumber.addEventListener('click', function() {this.closest('li').remove();})
});
