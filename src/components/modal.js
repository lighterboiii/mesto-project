import { profilePopup, readProfileContent, addPhotoPopup, resetAddCardForm } from '../components/utils.js';
import { deleteErrorMessages } from '../components/validate.js';

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', () => closeByEsc(popup));
};
function closeByEsc (popup) {
  if (event.key === 'Escape') {
    closePopup(popup);
  }
};
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', () => closeByEsc(popup))
};
function closeByOverlay (evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};
function openProfile () {
  readProfileContent(profilePopup);
  openPopup(profilePopup);
  deleteErrorMessages();
};
function openCardPopup () {
  resetAddCardForm();
  openPopup(addPhotoPopup);
  deleteErrorMessages();
};
function closeCardPopup (popup) {
  closePopup(popup);
};


export { closeByOverlay, openProfile, closeCardPopup,  closePopup, openPopup, openCardPopup };
