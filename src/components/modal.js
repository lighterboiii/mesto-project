
// функция дизейблинга кнопки сабмита формы (перенести методом в попапы)
function disableSubmitButton(submitButton) {
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add('form__button_inactive');
};
