import { profilePopup, addPhotoPopup, profileName, profileCaption,
  addCardForm, avatarEditForm, avatarEditPopup } from './constants.js';
import { deleteErrorMessages } from '../components/validate.js';
import { getInfo } from '../pages/index.js';

function escHandler() {
  if (event.key === 'Escape') {
    const opened = document.querySelector('.popup_opened');
    closePopup(opened);
  }
};
function openPopup(popup) {
  popup.classList.add('popup_opened');
  window.addEventListener('keydown', escHandler);
};
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', escHandler);
};
function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};
function openProfile() {
  getInfo(profileName.textContent, profileCaption.textContent)
  openPopup(profilePopup);
  deleteErrorMessages();
};
function openCardPopup() {
  addCardForm.reset();
  openPopup(addPhotoPopup);
  deleteErrorMessages();
};
function openAvatarPopup() {
  avatarEditForm.reset();
  openPopup(avatarEditPopup);
  deleteErrorMessages();
};
function toggleButtonText (isLoading, button, originalText) {
  if (isLoading) {
    button.textContent = 'Сохранение...'
  } else {
    button.textContent = originalText;
  }
};
// function areYouSure (popup) {
//   openPopup(areUSurePopup)
// };

// deleteButton.addEventListener('click', openPopup(areUSurePopup))


// const areUSurePopup = document.querySelector('.popup__delete');
// const deleteButton = document.querySelector('.delete-button');


export { closeByOverlay, openProfile, closePopup, openPopup, openCardPopup, openAvatarPopup, toggleButtonText };
