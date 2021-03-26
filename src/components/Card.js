export default class Card {
  constructor(api, myId, cardSelector, cardObject, handleCardClick, handleLike, handleDislike, handleDeleteClick) {
    this._cardSelector = cardSelector;
    this._api = api;
    this._myId = myId;
    this._cardObject = cardObject;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleDislike = handleDislike;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._titleElement = this._element.querySelector(".card__title");
    this._imageElement = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._likesCounter = this._element.querySelector(".card__like-counter");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._titleElement.textContent = this._cardObject.name;
    this._imageElement.src = this._cardObject.link;
    this._imageElement.alt = this._cardObject.name;
    if (this._cardObject.likes.length > 0) {
      this._likesCounter.textContent = this._cardObject.likes.length;
      if (this._cardObject.likes.find(item => item._id == this._myId)) {
        this._likeButton.classList.add('card__like-button_liked'); // поставить лайк, если я лайкал
      }
    }
    this.isliked = this._cardObject.likes.find(card => card._id == this._myId)
    this._setEventListeners();
    if (this._cardObject.owner) {
      if (this._cardObject.owner._id !== this._myId) {this._deleteButton.remove()}; // удалить корзину с чужих карточек
    }
    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {    
      if (this.isliked) {this._handleDislike(this._element, this)} // если лайкнута мной
      else {this._handleLike(this._element, this)}
    });
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick(this._element)
    );
    this._imageElement.addEventListener("click", () =>
      this._handleCardClick(this._cardObject.name, this._cardObject.link)
    );
  }
}