import '../pages/index.css';

import { FormValidation, config } from '../components/FormValidation.js';
import { createCard } from '../components/card.js';
import { openProfile, closePopup, openCardPopup, openAvatarPopup, toggleButtonText } from '../components/modal.js';
import { Api } from '../components/Api.js';
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
// экземпляр класса Api
export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: '79a19db7-3f97-4425-9bfc-faae1f13f72c',
    'Content-Type': 'application/json'
  }
});
// эксземпляр класса FormValidation
const setFormValidation = (formElement) => {
  const formValidation = new FormValidation(formElement, config);
  formValidation.enableValidation();
}
const formList = Array.from(document.querySelectorAll('.form'));
formList.forEach(form => {
  setFormValidation(form);
})
// функция получения данных профиля и карточек с сервера
let userId;

api.getAllData()
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
  api.postCard(formItemPhotoCaption.value, formItemPhotoLink.value)
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
  api.setUserInfo(profileFormNameInput.value, profileFormCaptionInput.value)
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
  api.setAvatar(avatarInput.value)
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
};

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
