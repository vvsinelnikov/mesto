export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  open() {
    this._popup.classList.add("popup_opened");
    this._setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    // почему-то не работает
    // this._popup.querySelector(".popup__close").removeEventListener("click", this.close.bind(this));
    // this._popup.removeEventListener("click", this._handleClickClose.bind(this));
    // document.removeEventListener("keydown", this._handleEscClose.bind(this));
    // console.log('tick')
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

  _setEventListeners() {
    this._popup.querySelector(".popup__close").addEventListener("click", this.close.bind(this));
    this._popup.addEventListener("click", this._handleClickClose.bind(this));
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }
};