import { profilePopup, fillInputContent, readProfileContent, resetInput } from '../components/utils.js';


function openPopup(popup) {
  popup.classList.add('popup_opened')
};
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};
function closeByOverlay (evt) {
  closePopup(evt.target);
  resetInput();
};
function closeCardPopup (popup) {
  closePopup(popup);
  resetInput();
};
function openProfile () {
  readProfileContent(profilePopup);
  openPopup(profilePopup);
};
function closeByEsc (popup) {
  document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    closePopup(popup);
    resetInput();
  }
})
};

export { closeByOverlay, openProfile, closeCardPopup,  closePopup, openPopup, closeByEsc  };
