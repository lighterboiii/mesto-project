class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._handleClose = this._handleClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _handleClose(evt) {
    if (evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  _handleEscClose() {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._handleClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

  _removeEventListeners() {
    this._popup.removeEventListener('click', this._handleClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }

};
