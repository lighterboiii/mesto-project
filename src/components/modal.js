import { profilePopup, readProfileContent, resetInput } from '../components/utils.js';


function openPopup(popup) {
  popup.classList.add('popup_opened');
  deleteErrorMessages();
};
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};
function openProfile () {
  readProfileContent(profilePopup);
  openPopup(profilePopup);
};
function closeByOverlay (evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
    resetInput();
  }
};
function closeCardPopup (popup) {
  closePopup(popup);
  resetInput();
};
function closeByEsc (popup) {
  document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    closePopup(popup);
    resetInput();
  }
})
};
const deleteErrorMessages = () => {
  const errorMessages = Array.from(document.querySelectorAll('.form__item-error'));
  const errorBorders = Array.from(document.querySelectorAll('.form__item'));
  errorMessages.forEach((message) => {
    message.textContent = '';
  })
  errorBorders.forEach((input) => {
    input.classList.remove('form__item_type_error');
  })
};

export { closeByOverlay, openProfile, closeCardPopup,  closePopup, openPopup, closeByEsc  };
