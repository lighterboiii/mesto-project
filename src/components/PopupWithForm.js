import { Popup } from '../components/Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { submit }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._inputsList = Array.from(this._form.querySelectorAll('.form__item'));
    this._submit = submit;
    this._submitButton = this._form.querySelector('.form__button');
    this._originalText = this._submitButton.textContent;
    this._submitHandler = this._submitHandler.bind(this);
  }

  toggleButtonText(isLoading, buttonLoadingText = 'Cохранение...') {
    if (isLoading) {
      this._submitButton.textContent = buttonLoadingText;
    } else {
      this._submitButton.textContent = this._originalText;
    }
  }

  _getInputValues() {
    const data = {};
    this._inputsList.forEach(input => {
      data[input.name] = input.value;
    })
    return data;
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._submit(this._getInputValues());
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._submitHandler);
    super.setEventListeners();
  }

  _removeEventListeners() {
    this._form.removeEventListener('submit', this._submitHandler);
    super._removeEventListeners();
  }

  close() {
    this._form.reset();
    this._removeEventListeners();
    super.close();
  }
}
