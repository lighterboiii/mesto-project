import { Popup } from '../components/Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { submitForm }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._submitForm = submitForm;
    this._submitButton = this._form.querySelector('.form__button');
    this._originalText = this._submitButton.textContent;
    this._submitHandler = this._submitHandler.bind(this);
  }

  renderLoading(isLoading, buttonLoadingText = 'Cохранение...') {
    if (isLoading) {
      this._submitButton.textContent = buttonLoadingText;
    } else {
      this._submitButton.textContent = this._originalText;
    }
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._submitForm(this._getInputValues());
  }

  _getInputValues() {
    const inputsList = Array.from(this._form.querySelectorAll('.form__item'));
    const data = { };
    inputsList.forEach(input => {
      data[input.name] = input.value;
    })
    return data;
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._submitHandler);
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    this._form.removeEventListener('submit', this._submitHandler);
    super.close();
  }
}
