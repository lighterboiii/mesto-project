export const config = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active',
  submitPhotoSelector: 'create-card-button',
  formItemError: '.form__item-error'
};

export class FormValidation {
  constructor(formElement, config) {
    this._formElement = formElement;
    this._config = config;
  };

  _getErrorMessage(input) {
    return this._formElement.querySelector(`.${input.id}-error`);
  };
  // функция для показа сообщения об ошибке
  _showInputError(input, message) {
    const errorElement = this._getErrorMessage(input);
    input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = message;
    errorElement.classList.add(this._config.errorClass);
  };
  // функция скрытия сообщения об ошибке
  _hideInputError(input) {
    const errorElement = this._getErrorMessage(input);
    errorElement.classList.remove(this._config.errorClass);
    input.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
  };
  // функция для проверки валидности инпута и показе стандартного сообщения об ошибке для невалидного поля ввода
  _checkInputValidity(input) {
    const errorElement = this._getErrorMessage(input);
    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity("");
    }

    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage, errorElement);
    } else {
      this._hideInputError(input, errorElement);
    }
  }
  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  };
  // переключение состояния кнопки сабмита при проверке на невалидность поля ввода
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', true);
    };
  };

  _inputChecker(evt) {
    const input = evt.target;
    this._checkInputValidity(input);
    this._toggleButtonState();
  };

  disableSubmitButton() {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
  };

  _deleteErrorMessages() {
    this._inputsList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._inputsList.forEach(element => {
      element.classList.remove(this._config.inputErrorClass);
    })
    this._errorsList = Array.from(this._formElement.querySelectorAll(`${this._config.inputSelector}-error`));
    this._errorsList.forEach(element => {
      element.textContent = '';
      element.classList.remove(this._config.errorClass);
    })
  }
  // функция добавления слушателя событий на ВСЕ инпуты в форме
  _addEventListeners(form) {
    this._formElement.addEventListener('reset', () => {
      this._deleteErrorMessages();
    })
    this._inputList = Array.from(form.querySelectorAll(this._config.inputSelector));
    this._buttonElement = form.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      input.addEventListener('input', (evt) => {
        this._inputChecker(evt);
      });
    });
  };
  // поиск всех форм в документе, отмена для каждой стандартного поведения и добавление слушателей событий на все формы
  enableValidation() {
    this._addEventListeners(this._formElement);
  };

};
