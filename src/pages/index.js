import './index.css';

import { enableValidation } from '../components/validate';
import { initialCards, submitCardForm, renderFromArray } from '../components/card.js';
import { closeByEsc, submitProfileForm, closeByOverlay, openProfile, closeCardPopup } from '../components/modal';
import { profilePopup, imagePopup, addPhotoPopup, closePopup, openPopup } from '../components/utils.js';

// функция валидации формы
enableValidation({
  // formSelector: '.popup',
  // inputSelector: '.form__item',
  // submitButtonSelector: '.form__button',
  // inactiveButtonClass: 'form__button_inactive',
  // inputErrorClass: 'form__item_type_error',
  // errorClass: 'form__item-error_active'
});
renderFromArray(initialCards);
// Закрытие модального окна на Esc
closeByEsc(profilePopup);
closeByEsc(addPhotoPopup);
closeByEsc(imagePopup);

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
// по той же причине остаётся ошибка при закрытии формы. При открытии заново поля заполнены, а ошибка есть



// const initialCards = [
//   {
//     name: 'Байкал',
//     link: 'https://images.unsplash.com/photo-1552588353-2f2cc7d429e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=778&q=80'
//   },
//   {
//     name: 'Красная Поляна',
//     link: 'https://images.unsplash.com/photo-1658170213328-c9d745df2041?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
//   },
//   {
//     name: 'Белгород',
//     link: 'https://images.unsplash.com/photo-1658170213798-080be7293ffd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2950&q=80'
//   },
//   {
//     name: 'Санкт-Петербург',
//     link: 'https://images.unsplash.com/photo-1658208004995-e75ea6e37654?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60'
//   },
//   {
//     name: 'Рязань',
//     link: 'https://images.unsplash.com/photo-1613411278232-e29e3506f4fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1611&q=80'
//   },
//   {
//     name: 'Мценск',
//     link: 'https://images.unsplash.com/photo-1658170213269-dc3aa8f27d0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
//   }
// ];


// функции

// //  открыть модальное окно
// function openPopup(popup) {
//   popup.classList.add('popup_opened');
// };
// // закрыть модальное окно
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
// };
// function closeByEsc(popup) {
//   addEventListener('keydown', function (evt) {
//     if (evt.key === 'Escape') {
//       closePopup(popup);
//       formItemPhotoLink.value = '';
//       formItemPhotoCaption.value = '';
//       imagePopup.classList.remove('photo-card_opened');
//     }
//   })
// }
// // отправить данные в профайл
// function submitProfileForm(event) {
//   event.preventDefault();
//   fillInputContent();
//   closePopup(profilePopup);
// };
// function readProfileContent () {
//   profileFormNameInput.value = profileName.textContent;
//   profileFormCaptionInput.value = profileCaption.textContent;
// }
// function fillInputContent () {
//   profileName.textContent = profileFormNameInput.value;
//   profileCaption.textContent = profileFormCaptionInput.value;
// }

// //функция создания карточки c изображением
// function createCard(data) {
//   const element = elementsTemplate.querySelector('.elements__item').cloneNode(true);
//   element.querySelector('.elements__caption').textContent = data.name;
//   element.querySelector('.elements__img').src = data.link;
//   element.querySelector('.elements__img').alt = data.name;
//   const deleteButton = element.querySelector('.delete-button'); // удаление созданной карточки
//   deleteButton.addEventListener('click', function () {
//     const elementItem = deleteButton.closest('.elements__item');
//     elementItem.remove();
//   });
//   const likeButton = element.querySelector('.like-button');
//   likeButton.addEventListener('mousedown', function () {
//     likeButton.classList.toggle('like-button_active'); // функция лайка созданной карточки
//   });
//   function openImage(evt) {
//     openedImage.src = evt.target.getAttribute('src');
//     openedImageCaption.textContent = evt.target.getAttribute('alt');
//     imagePopup.classList.add('photo-card_opened');
//   };
//   const image = element.querySelector('.elements__img');
//   image.addEventListener('click', openImage);
//   return element;
// };
// // отрисовка карточки в контейнере
// function renderCard(card, container) {
//   container.prepend(card);
// };
// // сабмит формы добавления карточки
// function submitCardForm(evt) {
//   evt.preventDefault();
//   const data = {
//     name: document.querySelector('.form__item_type_photo').value,
//     link: document.querySelector('.form__item_type_link').value
//   };
//   const card = createCard(data);
//   renderCard(card, elementsList);
//   closePopup(addPhotoPopup);
//   formItemPhotoLink.value = '';
//   formItemPhotoCaption.value = '';
// };
// // отрисовка карточек из массива
// initialCards.forEach(function (item) {
//   const card = createCard(item);
//   renderCard(card, elementsList);
// });
// // Закрытие модального окна на Esc
// closeByEsc(profilePopup);
// closeByEsc(addPhotoPopup);
// closeByEsc(imagePopup);



// // validation

// // функция для показа сообщения об ошибке
// const showInputError = (form, input, message) => {
//   const errorElement = form.querySelector(`.${input.id}-error`);
//   input.classList.add('form__item_type_error');
//   errorElement.textContent = message;
//   errorElement.classList.add('form__item-error_active');
// };
// // функция скрытия сообщения об ошибке
// const hideInputError = (form, input) => {
//   const errorElement = form.querySelector(`.${input.id}-error`);
//   errorElement.classList.remove('form__item-error_active');
//   input.classList.remove('form__item_type_error');
//   errorElement.textContent = '';
// };
// // функция для проверки валидности инпута и показе стандартного сообщения об ошибке для невалидного поля ввода
// const checkInputValidity = (form, input) => {
//   if (!input.validity.valid) {
//     showInputError(form, input, input.validationMessage);
//   } else {
//     hideInputError(form, input);
//   }
// };
// // если хотя бы один инпут в проверяемом аргументе(в данный момент массив инпутов) невалиден,
// // функция возвращает значение false для проверки на валидность, если все валидны, validity - true
// const hasInvalidInput = (inputList) => {
//   return inputList.some((input) => {
//     return !input.validity.valid;
//   });
// };
// // переключение состояния кнопки сабмита при проверке на невалидность поля ввода
// const toggleButtonState = (inputList, buttonElement) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add('form__button_inactive');
//     buttonElement.setAttribute('disabled', true);
//   } else {
//     buttonElement.classList.remove('form__button_inactive');
//     buttonElement.removeAttribute('disabled', true);
//   };
// };
// // функция добавления слушателя событий на ВСЕ инпуты в форме
// const addEventListeners = (form) => {
//   const inputList = Array.from(form.querySelectorAll('.form__item'));
//   const buttonElement = form.querySelector('.form__button');
//   toggleButtonState(inputList, buttonElement);

//   inputList.forEach((input) => {
//     input.addEventListener('input', function () {
//       toggleButtonState(inputList, buttonElement);
//       checkInputValidity(form, input);
//     });
//   });
// };
// // поиск всех форм в документе, отмена для каждой стандартного поведения и добавление слушателей событий на все формы
// const enableValidation = () => {
//   const formList = Array.from(document.querySelectorAll('.form'));
//   formList.forEach((form) => {
//     form.addEventListener('submit', function (evt) {
//       evt.preventDefault();
//     });
//     addEventListeners(form);
//   });
// };

// enableValidation(); // собсна вызов

// const profileSubmitButton = document.querySelector('.profile-submit-button'); // кнопка "Сохранить" редактирование профиля
// const createCardButton = document.querySelector('.create-card-button'); // кнопка "создать" карточку с фото


// addEventListener('keydown', function (evt) {
//   if (evt.key === 'Escape') {
//     formItemPhotoLink.value = '';
//     formItemPhotoCaption.value = '';
//     imagePopup.classList.remove('photo-card_opened');
//   }
// })

// const elementsTemplate = document.querySelector('#elements__template').content; // получаем контент темплейт
// const element = elementsTemplate.querySelector('.elements__item').cloneNode(true);
// const profilePopup = document.querySelector('.popup__profile'); // модальное окно редактирования профиля
// const profileName = document.querySelector('.profile__name'); // записал имя профиля в переменную
// const profileCaption = document.querySelector('.profile__caption'); // записал описание профиля в переменную
// const profileFormNameInput = document.querySelector('.form__item_type_name'); // инпут "имя" редактирования профиля
// const profileFormCaptionInput = document.querySelector('.form__item_type_job'); // инпут "о себе" редактирования профеля
// const addPhotoPopup = document.querySelector('.popup__add-photo') // нашел модальное окно добавления карточки
// const imagePopup = document.querySelector('.photo-card'); // открытое фото
// const openedImage = document.querySelector('.photo-card__image'); // фото полноразмерное
// const openedImageCaption = document.querySelector('.photo-card__caption'); // описание полноращмерного фото
// const elementsList = document.querySelector('.elements'); // контейнер для рендера карточек
// const formItemPhotoLink = document.querySelector('.form__item_type_link');
// const formItemPhotoCaption = document.querySelector('.form__item_type_photo'); // инпут с подписью к фото
