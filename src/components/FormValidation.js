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

  _deleteErrorMessages() {
    const errorMessages = Array.from(this._formSelector.querySelectorAll(this._config.formItemError));
    const errorBorders = Array.from(this._formSelector.querySelectorAll(this._config.inputSelector));
    errorMessages.forEach((message) => {
      message.textContent = '';
    })
    errorBorders.forEach((input) => {
      input.classList.remove(this._config.inputErrorClass);
    })
  };
  // функция дизейблинга кнопки "Сохранить"
  _disableSubmitButton(submitButton) {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add(this._config.inactiveButtonClass);
  };
  // функция для показа сообщения об ошибке
  _showInputError(input, message, errorElement) {
    input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = message;
    errorElement.classList.add(this._config.errorClass);
  };
  // функция скрытия сообщения об ошибке
  _hideInputError(input, errorElement) {
    errorElement.classList.remove(this._config.errorClass);
    input.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
  };
  // функция для проверки валидности инпута и показе стандартного сообщения об ошибке для невалидного поля ввода
  _checkInputValidity(input) {
    const errorElement = this._getErrorMessage(input);
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
  }
  // функция добавления слушателя событий на ВСЕ инпуты в форме
  _addEventListeners(form) {
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
      this._addEventListeners(this._formElement, config);
  };
};
// // функция для очистки ошибок валидации
// const deleteErrorMessages = () => {
//   const errorMessages = Array.from(document.querySelectorAll(config.formItemError));
//   const errorBorders = Array.from(document.querySelectorAll(config.inputSelector));
//   errorMessages.forEach((message) => {
//     message.textContent = '';
//   })
//   errorBorders.forEach((input) => {
//     input.classList.remove(config.inputErrorClass);
//   })
// };
// // функция дизейблинга кнопки "Сохранить"
// const disableSubmitButton = (submitButton) => {
//   submitButton.setAttribute('disabled', true);
//   submitButton.classList.add(config.inactiveButtonClass);
// };
// // функция для показа сообщения об ошибке
// const showInputError = (form, input, message) => {
//   const errorElement = form.querySelector(`.${input.id}-error`);
//   input.classList.add(config.inputErrorClass);
//   errorElement.textContent = message;
//   errorElement.classList.add(config.errorClass);
// };
// // функция скрытия сообщения об ошибке
// const hideInputError = (form, input) => {
//   const errorElement = form.querySelector(`.${input.id}-error`);
//   errorElement.classList.remove(config.errorClass);
//   input.classList.remove(config.inputErrorClass);
//   errorElement.textContent = '';
// };
// // функция для проверки валидности инпута и показе стандартного сообщения об ошибке для невалидного поля ввода
// const checkInputValidity = (form, input) => {
//   if (input.validity.patternMismatch) {
//     input.setCustomValidity(input.dataset.errorMessage);
//   } else {
//     input.setCustomValidity("");
//   };
//   if (!input.validity.valid) {
//     showInputError(form, input, input.validationMessage);
//   } else {
//     hideInputError(form, input);
//   }
// };
// const hasInvalidInput = (inputList) => {
//   return inputList.some((input) => {
//     return !input.validity.valid;
//   });
// };
// // переключение состояния кнопки сабмита при проверке на невалидность поля ввода
// const toggleButtonState = (inputList, buttonElement) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(config.inactiveButtonClass);
//     buttonElement.setAttribute('disabled', true);
//   } else {
//     buttonElement.classList.remove(config.inactiveButtonClass);
//     buttonElement.removeAttribute('disabled', true);
//   };
// };
// // функция добавления слушателя событий на ВСЕ инпуты в форме
// const addEventListeners = (form) => {
//   const inputList = Array.from(form.querySelectorAll(config.inputSelector));
//   const buttonElement = form.querySelector(config.submitButtonSelector);
//   toggleButtonState(inputList, buttonElement);

//   inputList.forEach((input) => {
//     input.addEventListener('input', function () {
//       toggleButtonState(inputList, buttonElement);
//       checkInputValidity(form, input);
//     });
//   });
// };
// // поиск всех форм в документе, отмена для каждой стандартного поведения и добавление слушателей событий на все формы
// const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((form) => {
//     form.addEventListener('submit', function (evt) {
//       evt.preventDefault();
//     });
//     addEventListeners(form, config);
//   });
// };

// export { enableValidation, deleteErrorMessages, disableSubmitButton, config };
