import '../pages/index.css';

import { enableValidation } from '../components/validate.js';
import { initialCards, submitCardForm, renderFromArray } from '../components/card.js';
import { submitProfileForm, closeByOverlay, openProfile, closeCardPopup,  closePopup, openPopup } from '../components/modal.js';
import { profilePopup, addPhotoPopup } from '../components/utils.js';

enableValidation({
  formSelector: '.popup',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
});
renderFromArray(initialCards);


// константы
const openProfilePopupButton = document.querySelector('.profile__button'); // кнопка открытия модального окна редактирования профиля
const addPhotoButton = document.querySelector('.add-button')  // нашел кнопку открытия окна добавления карточки
const profileCloseButton = document.querySelector('.profile-close-button'); // кнопка закрытия окна редактирования профиля
const closeAddPhotoPopup = document.querySelector('.popup__photo-close-button'); // нашел кнопку закрытия окна добавления карточки
const addCardForm = document.querySelector('.card-form'); // форма создания карточки
const page = document.querySelector('.page'); // Вся страница. Для закрытия на оверлей

// слушатели событий
openProfilePopupButton.addEventListener('click', openProfile); // открыть форму редактирования профиля
profileCloseButton.addEventListener('click', () => closePopup(profilePopup)); // закрытие окна редактирования профиля
profilePopup.addEventListener('submit', submitProfileForm); // сабмит окна редактирования профиля
addPhotoButton.addEventListener('click', () => openPopup(addPhotoPopup)); // открытие формы добавления карточки на страницу
closeAddPhotoPopup.addEventListener('click', () => closeCardPopup(addPhotoPopup)); // закрытие формы добавления карточки
addCardForm.addEventListener('submit', submitCardForm); // отправка формы добавления карточки на страницу
page.addEventListener('mousedown', closeByOverlay); // слушатель событий для закрытия окна по клику на оверлей

// остаётся проблемой, что форма редактирования профиля при открытии не считает записанные в неё значения как заполненное поле ввода,
// по той же причине остаётся ошибка при закрытии формы. При открытии заново поля заполнены, а ошибка есть. Потом исправить
