import '../pages/index.css';

import { disableSubmitButton, enableValidation, config } from '../components/validate.js';
import { createCard } from '../components/card.js';
import { closeByOverlay, openProfile, closePopup, openCardPopup, openAvatarPopup, toggleButtonText } from '../components/modal.js';
import { getUserInfo, setUserInfo, setAvatar, postCard, getInitialCards } from '../components/api.js';
import {
  profileAvatar,
  profileName,
  profileCaption,
  addCardForm,
  avatarEditForm,
  avatarEditPopup,
  avatarInput,
  avaCloseButton,
  profileAvatarButton,
  closePhotoButton,
  closeAddPhotoPopup,
  profileCloseButton,
  addPhotoButton,
  openProfilePopupButton,
  saveButton,
  elementsList,
  profilePopup,
  addPhotoPopup,
  imagePopup,
  profileFormNameInput,
  profileFormCaptionInput,
  formItemPhotoCaption,
  formItemPhotoLink } from '../components/utils.js';

// function calls
enableValidation(config);
// functions declaring
function renderCard(card, container) {
  container.prepend(card);
};
function submitCardForm(evt) {
  evt.preventDefault();
  toggleButtonText(saveButton);
  postCard(formItemPhotoCaption.value, formItemPhotoLink.value)
    .then((res) => {
      renderCardOnSubmit(res)
      closePopup(addPhotoPopup);
      addCardForm.reset();
      disableSubmitButton();
    })
};
function renderCardOnSubmit(res) {
  const card = createCard(res, userId);
  renderCard(card, elementsList);
}
// функция обновления user info
function submitProfileForm(event) {
  event.preventDefault();
  setUserInfo(profileFormNameInput.value, profileFormCaptionInput.value)
    .then(() => {
      setInfo(profileFormNameInput.value, profileFormCaptionInput.value)
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.log(err)
    })
};
// функция обновления аватара
function submitAvatar(event) {
  event.preventDefault();
  setAvatar(avatarInput.value)
    .then((res) => {
      profileAvatar.src = res.avatar
      closePopup(avatarEditPopup);
      avatarEditForm.reset();
    })
    .catch((err) => {
      console.log(err)
    })

};
// get info from inputs
function getInfo(name, about) {
  profileFormNameInput.value = name;
  profileFormCaptionInput.value = about;
};
// set info to textContent values
function setInfo(name, about) {
  profileName.textContent = name;
  profileCaption.textContent = about;
}
// func that get promises from Api for user info and rendered cards
let userId;
Promise.all([getUserInfo(), getInitialCards()])
  .then((res) => {
    console.log(res)
    userId = res[0]._id;
    profileAvatar.src = res[0].avatar;
    setInfo(res[0].name, res[0].about);
    res[1].forEach((item) => {
      const card = createCard(item, userId);
      renderCard(card, elementsList);
    })
  })
  .catch((err) => {
    console.log(err);
  });

// event listeners
closePhotoButton.addEventListener('click', () => closePopup(imagePopup)); // закрытие развернутого изображения
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
profileAvatarButton.addEventListener('click', openAvatarPopup); // открыть попап редактирования аватара
avaCloseButton.addEventListener('click', () => closePopup(avatarEditPopup)); // закрыть попап редактирования аватара
avatarEditPopup.addEventListener('submit', submitAvatar); // сохранение аватарки
document.addEventListener("DOMContentLoaded", getUserInfo); // получение информации о пользователе

export { renderCard, getInfo, setInfo };



// // consts
// const saveButton = document.querySelector('.form__button');
// const openProfilePopupButton = document.querySelector('.profile__button'); // кнопка открытия модального окна редактирования профиля
// const addPhotoButton = document.querySelector('.add-button')  // нашел кнопку открытия окна добавления карточки
// const profileCloseButton = document.querySelector('.profile-close-button'); // кнопка закрытия окна редактирования профиля
// const closeAddPhotoPopup = document.querySelector('.popup__photo-close-button'); // нашел кнопку закрытия окна добавления карточки
// const closePhotoButton = document.querySelector('.photo__close-button'); // кнопка закрытия биг имейджа
// const profileAvatarButton = document.querySelector('.profile__avatar-button'); // кнопка октрытия попапа аватарки
// const avaCloseButton = document.querySelector('.avatar-close-button'); // кнопка закрытия попапа аватарки
// const avatarEditPopup = document.querySelector('.popup__avatar'); // окнр изменения аватара
// const avatarEditForm = document.querySelector('.avatar-form') // форма изменения аватара
// const avatarInput = document.querySelector('.form__item-avatar'); // поле ввода формы изм-я аватара
