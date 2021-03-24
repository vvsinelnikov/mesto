export default class Card {
  constructor(api, myId, cardElement, handleCardClick, handleDeleteClick) {
    this._cardSelector = '#card-template';
    this._api = api;
    this._myId = myId;
    this._cardElement = cardElement;
    this._handleCardClick = handleCardClick;
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

    this._titleElement.textContent = this._cardElement.name;
    this._imageElement.src = this._cardElement.link;
    this._imageElement.alt = this._cardElement.name;
    if (this._cardElement.likes.length > 0) {
      this._likesCounter.textContent = this._cardElement.likes.length;
      if (this._cardElement.likes.find(item => item._id == this._myId)) {
        this._likeButton.classList.add('card__like-button_liked'); // поставить лайк, если я лайкал
      }
    }
    this._setEventListeners();
    if (this._cardElement.owner) {
      if (this._cardElement.owner._id !== this._myId) {this._deleteButton.remove()}; // удалить корзину с чужих карточек
    }
    return this._element;
  }

  like() {
    this._api.cardLike(this._cardElement._id)
      .then((res) => {
        this._likeButton.classList.add('card__like-button_liked')
        this._likesCounter.textContent = res.likes.length
      })
      .catch(err => console.log('card.like ' + err))
  }

  dislike() {
    this._api.cardDislike(this._cardElement._id)
      .then((res) => {
        this._likeButton.classList.remove('card__like-button_liked');
        if (res.likes.length == 0) {this._likesCounter.textContent = ''}
        else {this._likesCounter.textContent = res.likes.length}
      })
      .catch(err => console.log('card.dislike ' + err))
  }

  delete() {
    return this._api.deleteCard(this._cardElement._id)
      .catch(err => console.log('card.delete ' + err))
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {    
      this._api.getInitialCards()
        .then(res => {
          const selectedCard = res.find(card => card._id == this._cardElement._id) // текущая карточка
          if (selectedCard.likes.find(card => card._id == this._myId)) {this.dislike()} // если лайкнута мной
          else {this.like()}
        })
    });
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick(this._element)
    );
    this._imageElement.addEventListener("click", () =>
      this._handleCardClick(this._cardElement.name, this._cardElement.link)
    );
  }
}