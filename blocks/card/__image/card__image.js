const zoomTemplate = document.querySelector('#zoom-template').content;
const footer = document.querySelector('.footer');

function zoomImage() {  
  const zoomContent = zoomTemplate.cloneNode(true);
  const zoomImg = zoomContent.querySelector('.zoom__image'); // картинка
  const zoomText = zoomContent.querySelector('.zoom__text'); // подпись
  zoomImg.src = this.src;
  zoomImg.alt = this.alt;
  zoomText.textContent = this.alt;
  footer.append(zoomContent);
  document.querySelector('.zoom__close').addEventListener('click', function() {document.querySelector('.zoom').remove();});
  // document.querySelector('.zoom').classList.add('popup_opened'); // плавное появление не работает
};

// этот код нужен только для карточек, прописанных в html
// const cardImage = document.querySelectorAll('.card__image');
// cardImage.forEach((cardNumber) => {cardNumber.addEventListener('click', zoomImage);});
