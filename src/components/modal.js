import { profilePopup, formItemPhotoCaption, formItemPhotoLink, imagePopup, closePopup, openPopup } from '../components/utils.js';

function closeByEsc(popup) {
  addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
      formItemPhotoLink.value = '';
      formItemPhotoCaption.value = '';
      imagePopup.classList.remove('photo-card_opened');
    }
  })
}
function closeByOverlay (evt) {
  closePopup(evt.target);
  evt.target.classList.remove('photo-card_opened');
}
function readProfileContent () {
  profileFormNameInput.value = profileName.textContent;
  profileFormCaptionInput.value = profileCaption.textContent;
};
function fillInputContent () {
  profileName.textContent = profileFormNameInput.value;
  profileCaption.textContent = profileFormCaptionInput.value;
};
function clearInput () {
  formItemPhotoLink.value = '';
  formItemPhotoCaption.value = '';
}
function closeCardPopup (popup) {
  clearInput();
  closePopup(popup);
}
function openProfile () {
  readProfileContent();
  openPopup(profilePopup);
};

// отправить данные в профайл
function submitProfileForm(event) {
  event.preventDefault();
  fillInputContent();
  closePopup(profilePopup);
};
const profileFormNameInput = document.querySelector('.form__item_type_name');
const profileFormCaptionInput = document.querySelector('.form__item_type_job');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');

export { closeByEsc, submitProfileForm, readProfileContent, closeByOverlay, openProfile, closeCardPopup }
