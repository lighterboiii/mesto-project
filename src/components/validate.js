// функция для показа сообщения об ошибке
const showInputError = (form, input, message) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add('form__item_type_error');
  errorElement.textContent = message;
  errorElement.classList.add('form__item-error_active');
};
// функция скрытия сообщения об ошибке
const hideInputError = (form, input) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.classList.remove('form__item-error_active');
  input.classList.remove('form__item_type_error');
  errorElement.textContent = '';
};
// функция для проверки валидности инпута и показе стандартного сообщения об ошибке для невалидного поля ввода
const checkInputValidity = (form, input) => {
  if (input.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    input.setCustomValidity("");
  };
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
};
// если хотя бы один инпут в проверяемом аргументе(в данный момент массив инпутов) невалиден,
// функция возвращает значение false для проверки на валидность, если все валидны, validity - true
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};
// переключение состояния кнопки сабмита при проверке на невалидность поля ввода
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__button_inactive');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('form__button_inactive');
    buttonElement.removeAttribute('disabled', true);
  };
};
// функция добавления слушателя событий на ВСЕ инпуты в форме
const addEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll('.form__item'));
  const buttonElement = form.querySelector('.form__button');
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((input) => {
    input.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement);
      checkInputValidity(form, input);
    });
  });
};
// поиск всех форм в документе, отмена для каждой стандартного поведения и добавление слушателей событий на все формы
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    addEventListeners(form);
  });
};

export { enableValidation };
