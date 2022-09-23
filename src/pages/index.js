import '../pages/index.css';

import { disableSubmitButton, enableValidation, config } from '../components/validate.js';
import { imagePopup, createCard, elementsList } from '../components/card.js';
import { closeByOverlay, openProfile, closeCardPopup, closePopup, openCardPopup } from '../components/modal.js';
import { addCardForm, initialCards, profilePopup, addPhotoPopup, formItemPhotoCaption, formItemPhotoLink, fillInputContent, resetAddCardForm } from '../components/utils.js';

// function calls
enableValidation(config);
renderInitialCards(initialCards);
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

function renderInitialCards(array) {
  array.forEach(function (item) {
    const card = createCard(item);
    renderCard(card, elementsList);
  });
};

function submitProfileForm(event) {
  event.preventDefault();
  fillInputContent();
  closePopup(profilePopup);
};


// consts
const openProfilePopupButton = document.querySelector('.profile__button'); // кнопка открытия модального окна редактирования профиля
const addPhotoButton = document.querySelector('.add-button')  // нашел кнопку открытия окна добавления карточки
const profileCloseButton = document.querySelector('.profile-close-button'); // кнопка закрытия окна редактирования профиля
const closeAddPhotoPopup = document.querySelector('.popup__photo-close-button'); // нашел кнопку закрытия окна добавления карточки
const closePhotoButton = document.querySelector('.photo__close-button'); // кнопка закрытия биг имейджа


// event listeners
closePhotoButton.addEventListener('click', () => closePopup(imagePopup));
openProfilePopupButton.addEventListener('click', openProfile); // открыть форму редактирования профиля
profileCloseButton.addEventListener('click', () => closePopup(profilePopup)); // закрытие окна редактирования профиля
profilePopup.addEventListener('submit', submitProfileForm); // сабмит окна редактирования профиля
addPhotoButton.addEventListener('click', openCardPopup); // открытие формы добавления карточки на страницу
closeAddPhotoPopup.addEventListener('click', () => closeCardPopup(addPhotoPopup)); // закрытие формы добавления карточки
addCardForm.addEventListener('submit', submitCardForm); // отправка формы добавления карточки на страницу
profilePopup.addEventListener('mousedown', closeByOverlay); // закрытие попапов нажатием на оверлей
addPhotoPopup.addEventListener('mousedown', closeByOverlay);
imagePopup.addEventListener('mousedown', closeByOverlay);
