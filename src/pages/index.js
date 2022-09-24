import '../pages/index.css';

import { disableSubmitButton, enableValidation, config } from '../components/validate.js';
import { imagePopup, createCard, elementsList } from '../components/card.js';
import { closeByOverlay, openProfile, closePopup, openCardPopup, openPopup, openAvatarPopup } from '../components/modal.js';
import { addCardForm, profilePopup, addPhotoPopup, formItemPhotoCaption, formItemPhotoLink, fillInputContent, resetAddCardForm } from '../components/utils.js';
import { getUserInfo, setProfileInfo, setAvatar } from '../components/api.js';

// function calls
enableValidation(config);
// functions declaring
function renderCard(card, container) {
  container.prepend(card);
};
function submitCardForm(evt) {
  evt.preventDefault();
  const data = {
    name: formItemPhotoCaption.value,
    link: formItemPhotoLink.value
  };
  const card = createCard(data);
  renderCard(card, elementsList);
  closePopup(addPhotoPopup);
  resetAddCardForm();
  disableSubmitButton();
};
function submitProfileForm(event) {
  event.preventDefault();
  fillInputContent()
  setProfileInfo();
  closePopup(profilePopup);
};
function submitAvatar(event) {
  event.preventDefault();
  setAvatar();
  closePopup(avatarEditPopup);
  avatarEditForm.reset();
};


// consts
const openProfilePopupButton = document.querySelector('.profile__button'); // кнопка открытия модального окна редактирования профиля
const addPhotoButton = document.querySelector('.add-button')  // нашел кнопку открытия окна добавления карточки
const profileCloseButton = document.querySelector('.profile-close-button'); // кнопка закрытия окна редактирования профиля
const closeAddPhotoPopup = document.querySelector('.popup__photo-close-button'); // нашел кнопку закрытия окна добавления карточки
const closePhotoButton = document.querySelector('.photo__close-button'); // кнопка закрытия биг имейджа
const profileAvatarButton = document.querySelector('.profile__avatar-button'); // кнопка октрытия попапа аватарки
const avaCloseButton = document.querySelector('.avatar-close-button'); // кнопка закрытия попапа аватарки
const avatarEditPopup = document.querySelector('.popup__avatar'); // окнр изменения аватара
const avatarEditForm = document.querySelector('.avatar-form') // форма изменения аватара


// event listeners
closePhotoButton.addEventListener('click', () => closePopup(imagePopup));
openProfilePopupButton.addEventListener('click', openProfile); // открыть форму редактирования профиля
profileCloseButton.addEventListener('click', () => closePopup(profilePopup)); // закрытие окна редактирования профиля
profilePopup.addEventListener('submit', submitProfileForm); // сабмит окна редактирования профиля
addPhotoButton.addEventListener('click', openCardPopup); // открытие формы добавления карточки на страницу
closeAddPhotoPopup.addEventListener('click', () => closePopup(addPhotoPopup)); // закрытие формы добавления карточки
addCardForm.addEventListener('submit', submitCardForm); // отправка формы добавления карточки на страницу
profilePopup.addEventListener('mousedown', closeByOverlay); // закрытие попапов нажатием на оверлей
addPhotoPopup.addEventListener('mousedown', closeByOverlay);
imagePopup.addEventListener('mousedown', closeByOverlay);
avatarEditPopup.addEventListener('mousedown', closeByOverlay);
profileAvatarButton.addEventListener('click', openAvatarPopup);
avaCloseButton.addEventListener('click', () => closePopup(avatarEditPopup));
avatarEditPopup.addEventListener('submit', submitAvatar);
document.addEventListener("DOMContentLoaded", getUserInfo);

export { renderCard, avatarEditForm, avatarEditPopup };
