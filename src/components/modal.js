import { profilePopup, formItemPhotoCaption, formItemPhotoLink, imagePopup, clearInput, fillInputContent, readProfileContent } from '../components/utils.js';


function openPopup(popup) {
  popup.classList.add('popup_opened');
  addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
      clearInput();
    }
  })
};
// закрыть модальное окно
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};
function closeByOverlay (evt) {
  closePopup(evt.target);
  evt.target.classList.remove('photo-card_opened');
}
function closeCardPopup (popup) {
  clearInput();
  closePopup(popup);
}
function openProfile () {
  readProfileContent(profilePopup);
  openPopup(profilePopup);
};

// отправить данные в профайл
function submitProfileForm(event) {
  event.preventDefault();
  fillInputContent();
  closePopup(profilePopup);
};


export { submitProfileForm, closeByOverlay, openProfile, closeCardPopup,  closePopup, openPopup  }
