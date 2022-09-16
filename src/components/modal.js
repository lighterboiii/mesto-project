import { profilePopup, formItemPhotoCaption, formItemPhotoLink, imagePopup } from '../components/utils.js';

//  открыть модальное окно
function openPopup(popup) {
  popup.classList.add('popup_opened');
};
// закрыть модальное окно
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

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
function readProfileContent () {
  profileFormNameInput.value = profileName.textContent;
  profileFormCaptionInput.value = profileCaption.textContent;
};
function fillInputContent () {
  profileName.textContent = profileFormNameInput.value;
  profileCaption.textContent = profileFormCaptionInput.value;
};

// отправить данные в профайл
function submitProfileForm(event) {
  event.preventDefault();
  fillInputContent();
  closePopup(profilePopup);
};
const profileFormNameInput = document.querySelector('.form__item_type_name'); // инпут "имя" редактирования профиля
const profileFormCaptionInput = document.querySelector('.form__item_type_job');
const profileName = document.querySelector('.profile__name'); // записал имя профиля в переменную
const profileCaption = document.querySelector('.profile__caption');

export { closePopup, openPopup, closeByEsc, submitProfileForm, readProfileContent }
