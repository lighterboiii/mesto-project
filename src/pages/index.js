import '../pages/index.css';

import { enableValidation } from '../components/validate.js';
import { imagePopup, createCard, elementsList } from '../components/card.js';
import { closeByOverlay, closeByEsc, openProfile, closeCardPopup, closePopup, openPopup } from '../components/modal.js';
import { initialCards, profilePopup, addPhotoPopup, formItemPhotoCaption, formItemPhotoLink } from '../components/utils.js';

// function calls
closeByEsc(profilePopup);
closeByEsc(imagePopup);
closeByEsc(addPhotoPopup);
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
});
renderInitialCards(initialCards);
// functions declaring
function renderCard(card, container) {  // отрисовка карточки в контейнере
  container.prepend(card);
};

function submitCardForm(evt) {
  evt.preventDefault();
  const data = {
    name: formItemPhotoCaption.value,  // сабмит формы добавления карточки
    link: formItemPhotoLink.value
  };
  const card = createCard(data);
  renderCard(card, elementsList);
  closePopup(addPhotoPopup);
  addCardForm.reset();
};

function renderInitialCards(array) {  // отрисовка карточек из массива
  array.forEach(function (item) {
    const card = createCard(item);
    renderCard(card, elementsList);
  });
}
// отправить данные в профайл
function submitProfileForm(event) {
  event.preventDefault();
  fillInputContent();
  closePopup(profilePopup);
};


// константы
const openProfilePopupButton = document.querySelector('.profile__button'); // кнопка открытия модального окна редактирования профиля
const addPhotoButton = document.querySelector('.add-button')  // нашел кнопку открытия окна добавления карточки
const profileCloseButton = document.querySelector('.profile-close-button'); // кнопка закрытия окна редактирования профиля
const closeAddPhotoPopup = document.querySelector('.popup__photo-close-button'); // нашел кнопку закрытия окна добавления карточки
const addCardForm = document.querySelector('.card-form'); // форма создания карточки
const closePhotoButton = document.querySelector('.photo__close-button'); // кнопка закрытия биг имейджа

// слушатели событий
closePhotoButton.addEventListener('click', () => closePopup(imagePopup));
openProfilePopupButton.addEventListener('click', openProfile); // открыть форму редактирования профиля
profileCloseButton.addEventListener('click', () => closePopup(profilePopup)); // закрытие окна редактирования профиля
profilePopup.addEventListener('submit', submitProfileForm); // сабмит окна редактирования профиля
addPhotoButton.addEventListener('click', () => openPopup(addPhotoPopup)); // открытие формы добавления карточки на страницу
closeAddPhotoPopup.addEventListener('click', () => closeCardPopup(addPhotoPopup)); // закрытие формы добавления карточки
addCardForm.addEventListener('submit', submitCardForm); // отправка формы добавления карточки на страницу
imagePopup.addEventListener('mousedown', closeByOverlay); // слушатель событий для закрытия развернутого изображения по клику на оверлей
profilePopup.addEventListener('mousedown', closeByOverlay);
addPhotoPopup.addEventListener('mousedown', closeByOverlay);
