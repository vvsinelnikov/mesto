export default class Popup {
  constructor(popupElement) {
    this._popup = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickClose = this._handleClickClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.addEventListener("click", this._handleClickClose);
  }

  close() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.removeEventListener("click", this._handleClickClose);
    this._popup.classList.remove("popup_opened");
  }

  // закрытие по Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  
  // закрытие по клику вне попапа
  _handleClickClose(evt) {
    if (!this._popup.querySelector(".popup__container").contains(evt.target)) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector(".popup__close").addEventListener("click", this.close.bind(this));
  }
};