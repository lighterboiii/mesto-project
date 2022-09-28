import { profilePopup, addPhotoPopup, profileName, profileCaption,
  addCardForm, avatarEditForm, avatarEditPopup } from '../components/utils.js';
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
  // readProfileContent();
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

// поработать над этим
function toggleButtonText(saveButton) {
  if (document.readyState === 'loading') {
    saveButton.textContent = 'Сохранение...'
  } else {
    saveButton.textContent = 'Сохранить';
  }
};


export { closeByOverlay, openProfile, closePopup, openPopup, openCardPopup, openAvatarPopup, toggleButtonText };
