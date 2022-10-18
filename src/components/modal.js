import {
  profilePopup, addPhotoPopup, profileName, profileCaption,
  addCardForm, avatarEditForm, avatarEditPopup, createCardButton, avatarSubmitButton
} from './constants.js';
import { getInfo } from '../pages/index.js';

function handleEsc(evt) {
  if (evt.key === 'Escape') {
    const opened = document.querySelector('.popup_opened');
    closePopup(opened);
  }
};
function openPopup(popup) {
  popup.classList.add('popup_opened');
  window.addEventListener('keydown', handleEsc);
};
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', handleEsc);
};
function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};
function openProfile() {
  getInfo(profileName.textContent, profileCaption.textContent)
  openPopup(profilePopup);
};
function openCardPopup() {
  disableSubmitButton(createCardButton);
  addCardForm.reset();
  openPopup(addPhotoPopup);
};
function openAvatarPopup() {
  disableSubmitButton(avatarSubmitButton);
  avatarEditForm.reset();
  openPopup(avatarEditPopup);
};
// функция дизейблинга кнопки сабмита формы
function disableSubmitButton(submitButton) {
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add('form__button_inactive');
};
// функция переключения текста кнопки при сохранении
function toggleButtonText(isLoading, button, originalText) {
  if (isLoading) {
    button.textContent = 'Сохранение...'
  } else {
    button.textContent = originalText;
  }
};

export { closeByOverlay, openProfile, closePopup, openPopup, openCardPopup, openAvatarPopup, toggleButtonText };
