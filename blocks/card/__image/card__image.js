const cardImage = document.querySelectorAll('.card__image');
const zoomTemplate = document.querySelector('#zoom-template').content;
const footer = document.querySelector('.footer');

function zoomImage() {
  const zoom = zoomTemplate.cloneNode(true);
  zoom.querySelector('.zoom__image').src = this.src;
  zoom.querySelector('.zoom__image').alt = this.alt;
  footer.append(zoom); 
  const zoomClose = document.querySelector('.zoom__close');
  zoomClose.addEventListener('click', function() {document.querySelector('.zoom').remove();});
};

cardImage.forEach(function(cardNumber) {
  cardNumber.addEventListener('click', zoomImage);
});