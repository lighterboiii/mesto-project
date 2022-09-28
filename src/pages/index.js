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
  elementsList,
  profilePopup,
  addPhotoPopup,
  imagePopup,
  profileFormNameInput,
  profileFormCaptionInput,
  formItemPhotoCaption,
  formItemPhotoLink,
  profileSubmitButton,
  createCardButton,
  avatarSubmitButton } from '../components/utils.js';

// function calls
enableValidation(config);
// functions declaring
// функция рендера карточки первой в список
function renderCard(card, container) {
  container.prepend(card);
};
// функция для рендера карточек с сервера от старых к новым
function renderServerCard(card, container) {
  container.append(card);
}
// функция рендера на сабмит формы добавления карточки
function renderOnSubmit(res) {
  const card = createCard(res, userId);
  renderCard(card, elementsList);
}
function submitCardForm(evt) {
  evt.preventDefault();
  toggleButtonText(true, createCardButton, 'Создать')
  postCard(formItemPhotoCaption.value, formItemPhotoLink.value)
    .then((res) => {
      renderOnSubmit(res)
      closePopup(addPhotoPopup);
      addCardForm.reset();
      disableSubmitButton();
    })
    .catch((err) => {
      console.log(err)
    })
};
// функция обновления user info
function submitProfileForm(event) {
  event.preventDefault();
  toggleButtonText(true, profileSubmitButton, 'Сохранить')
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
  toggleButtonText(true, avatarSubmitButton, 'Сохранить')
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
    userId = res[0]._id;
    profileAvatar.src = res[0].avatar;
    setInfo(res[0].name, res[0].about);
    res[1].forEach((item) => {
      const card = createCard(item, userId);
      renderServerCard(card, elementsList);
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
