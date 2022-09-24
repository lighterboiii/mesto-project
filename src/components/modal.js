import { profilePopup, readProfileContent, addPhotoPopup, resetAddCardForm } from '../components/utils.js';
import { deleteErrorMessages } from '../components/validate.js';
import { avatarEditForm, avatarEditPopup } from '../pages/index.js';

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
  readProfileContent(profilePopup);
  openPopup(profilePopup);
  deleteErrorMessages();
};
function openCardPopup() {
  resetAddCardForm();
  openPopup(addPhotoPopup);
  deleteErrorMessages();
};
function openAvatarPopup() {
  avatarEditForm.reset();
  openPopup(avatarEditPopup);
  deleteErrorMessages();
}
// function closeCardPopup(popup) {
//   closePopup(popup);
// };


export { closeByOverlay, openProfile, closePopup, openPopup, openCardPopup, openAvatarPopup };
