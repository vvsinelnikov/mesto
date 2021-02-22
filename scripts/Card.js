export default class Card {
  constructor(cardElement, cardSelector, openPopup) {
    this._name = cardElement.name;
    this._link = cardElement.link;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleZoomImage();
      });
  }

  _handleLikeButton() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_liked");
  }

  _handleDeleteButton() {
    this._element.closest("li").remove();
  }

  _handleZoomImage() {
    const zoomPopup = document.querySelector("#zoom-popup"); // попап с большой картинкой
    zoomPopup.querySelector(".popup__image").src = this._link;
    zoomPopup.querySelector(".popup__image").alt = this._name;
    zoomPopup.querySelector(".popup__text").textContent = this._name; // подпись к большой картинке
    this._openPopup(zoomPopup);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._setEventListeners();
    return this._element;
  }

  // проверка доступности файла (самодеятельность)
  // checkUrl() {
  //   let img = new Image();
  //   img.src = this._link;
  //   console.log(this._link)
  //   img.onerror = function () {
  //     document.querySelector(".card").remove();
  //     alert("Файл не найден");
  //   };
  // }
}
