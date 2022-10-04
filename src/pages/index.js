import '../pages/index.css';

import { enableValidation, config } from '../components/validate.js';
import { createCard } from '../components/card.js';
import { openProfile, closePopup, openCardPopup, openAvatarPopup, toggleButtonText } from '../components/modal.js';
import { getUserInfo, setUserInfo, setAvatar, postCard, getInitialCards } from '../components/api.js';
import {
  profileAvatar,
  profileName,
  profileCaption,
  addCardForm,
  avatarEditForm,
  avatarEditPopup,
  avatarInput,
  profileAvatarButton,
  addPhotoButton,
  openProfilePopupButton,
  elementsList,
  profilePopup,
  addPhotoPopup,
  profileFormNameInput,
  profileFormCaptionInput,
  formItemPhotoCaption,
  formItemPhotoLink,
  popups
} from '../components/constants.js';

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
};
// функция рендера на сабмит формы добавления карточки
function renderOnSubmit(res) {
  const card = createCard(res, userId);
  renderCard(card, elementsList);
};
function submitCardForm(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  toggleButtonText(true, submitButton, 'Создать')
  postCard(formItemPhotoCaption.value, formItemPhotoLink.value)
    .then((res) => {
      renderOnSubmit(res)
      closePopup(addPhotoPopup);
      addCardForm.reset();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      toggleButtonText(false, submitButton, 'Создать')
    })
};
// функция обновления user info
function submitProfileForm(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  toggleButtonText(true, submitButton, 'Сохранить')
  setUserInfo(profileFormNameInput.value, profileFormCaptionInput.value)
    .then(() => {
      setInfo(profileFormNameInput.value, profileFormCaptionInput.value)
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      toggleButtonText(false, submitButton, 'Сохранить')
    })
};
// функция обновления аватара
function submitAvatar(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  toggleButtonText(true, submitButton, 'Сохранить')
  setAvatar(avatarInput.value)
    .then((res) => {
      profileAvatar.src = res.avatar
      closePopup(avatarEditPopup);
      avatarEditForm.reset();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      toggleButtonText(false, submitButton, 'Сохранить')
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
  .then(([userData, cards]) => {
    userId = userData._id;
    profileAvatar.src = userData.avatar;
    setInfo(userData.name, userData.about);
    cards.forEach((item) => {
      const card = createCard(item, userId);
      renderServerCard(card, elementsList);
    })
  })
  .catch((err) => {
    console.log(err);
  });

//event listeners
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('form__close-button')) {
          closePopup(popup)
        }
    })
});
openProfilePopupButton.addEventListener('click', openProfile); // открыть форму редактирования профиля
profilePopup.addEventListener('submit', submitProfileForm); // сабмит окна редактирования профиля
addPhotoButton.addEventListener('click', openCardPopup); // открытие формы добавления карточки на страницу
addCardForm.addEventListener('submit', submitCardForm); // отправка формы добавления карточки на страницу
profileAvatarButton.addEventListener('click', openAvatarPopup); // открыть попап редактирования аватара
avatarEditPopup.addEventListener('submit', submitAvatar); // сохранение аватарки

export { renderCard, getInfo, setInfo };
