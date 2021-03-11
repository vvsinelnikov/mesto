export default class Card {
  constructor(cardElement, cardSelector, handleCardClick) {
    this._name = cardElement.name;
    this._link = cardElement.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._titleElement.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._setEventListeners();

    // *** проверка ссылки (самодеятельность) ***
    // onerror срабатывает только после публикации в DOM :(
    const img = new Image();
    img.src = this._link;
    img.onerror = function () {
      document.querySelector(".card").remove();
      alert("Файл не найден");
    };

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () =>
      this._likeButton.classList.toggle("card__like-button_liked")
    );
    this._deleteButton.addEventListener("click", () =>
      this._element.closest("li").remove()
    );
    this._imageElement.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }
}
