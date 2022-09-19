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

const profilePopup = document.querySelector('.popup__profile'); // модальное окно редактирования профиля
const formItemPhotoLink = document.querySelector('.form__item_type_link');
const formItemPhotoCaption = document.querySelector('.form__item_type_photo'); // инпут с подписью к фото
const imagePopup = document.querySelector('.photo-card'); // открытое фото
const addPhotoPopup = document.querySelector('.popup__add-photo');
const profileFormNameInput = document.querySelector('.form__item_type_name');
const profileFormCaptionInput = document.querySelector('.form__item_type_job');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');

export { profilePopup, formItemPhotoCaption, formItemPhotoLink, addPhotoPopup, readProfileContent, clearInput, fillInputContent };
