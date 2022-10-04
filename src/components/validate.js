const config = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active',
  submitPhotoSelector: 'create-card-button',
  formItemError: '.form__item-error'
};
// функция для очистки ошибок валидации
const deleteErrorMessages = () => {
  const errorMessages = Array.from(document.querySelectorAll(config.formItemError));
  const errorBorders = Array.from(document.querySelectorAll(config.inputSelector));
  errorMessages.forEach((message) => {
    message.textContent = '';
  })
  errorBorders.forEach((input) => {
    input.classList.remove(config.inputErrorClass);
  })
};
// функция дизейблинга кнопки "Сохранить"
const disableSubmitButton = (submitButton) => {
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add(config.inactiveButtonClass);
};
// функция для показа сообщения об ошибке
const showInputError = (form, input, message) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = message;
  errorElement.classList.add(config.errorClass);
};
// функция скрытия сообщения об ошибке
const hideInputError = (form, input) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.classList.remove(config.errorClass);
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
};
// функция для проверки валидности инпута и показе стандартного сообщения об ошибке для невалидного поля ввода
const checkInputValidity = (form, input) => {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  };
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};
// переключение состояния кнопки сабмита при проверке на невалидность поля ввода
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', true);
  };
};
// функция добавления слушателя событий на ВСЕ инпуты в форме
const addEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonElement = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((input) => {
    input.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement);
      checkInputValidity(form, input);
    });
  });
};
// поиск всех форм в документе, отмена для каждой стандартного поведения и добавление слушателей событий на все формы
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    addEventListeners(form, config);
  });
};

export { enableValidation, deleteErrorMessages, disableSubmitButton, config };
