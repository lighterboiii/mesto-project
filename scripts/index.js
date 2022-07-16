const profileButton = document.querySelector('.profile__button'); // кнопка открытия модального окна редактирования профиля
const popup = document.querySelector('.popup'); // нашел в разметке модальное окно редактирования профиля
const closeButton = document.querySelector('.form__close-button'); // кнопка закрытия окна редактирования профила
const submitButton = document.querySelector('.form__button'); // кнопка "Сохранить" редактирование профиля
// const profileContainer = document.querySelector('.profile__container'); //
let profileName = document.querySelector('.profile__name'); // записал имя профиля в переменную
let profileCaption = document.querySelector('.profile__caption'); // записал описание профиля в переменную
const addPhotoButton = document.querySelector('.add-button')  // нашел кнопку открытия окна добавления карточки
const photoPopUp = document.querySelector('.popup__photo-container') // нашел модальное окно добавления карточки
const closePopUpButton = document.querySelector('.close-popup'); // нашел кнопку закрытия окна добавления карточки


function popupOpen() {
  popup.classList.add('popup_opened');
  let formName = document.querySelector('.form__item_type_name'); // функция открытия модального окна редактирования информации с записанными значениями
  let formJob = document.querySelector('.form__item_type_job');

  formName.value = profileName.textContent;
  formJob.value = profileCaption.textContent;
}
function popupClose() {
  popup.classList.remove('popup_opened'); // закрытие модального окна редактирования профиля
}
function formSubmitHandler(evt) {
  evt.preventDefault();
  let formName = document.querySelector('.form__item_type_name');
  let formJob = document.querySelector('.form__item_type_job');  // функция редактирования профиля

  profileName.textContent = formName.value;
  profileCaption.textContent = formJob.value;

  popupClose();
}
function addPhoto() {
  photoPopUp.classList.add('popup_opened'); // функция открытия модального окна добавления карточки
}
function closePopUp() {
  photoPopUp.classList.remove('popup_opened'); // функция закрытия модального окна добавления карточки
}

profileButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
submitButton.addEventListener('click', formSubmitHandler);
addPhotoButton.addEventListener('click', addPhoto);
closePopUpButton.addEventListener('click', closePopUp); // обработчики событий на кнопки


// собираем добавление карточки на страницу
// находим кнопку "Создать"
const createButton = document.querySelector('.form__submit-button');
// пишем функцию, которая будет считывать значения полей ввода и на основе этой информации создавать элемент и добавлять его в ДОМ
function createElement(evt) {
  evt.preventDefault();
  // записываем в переменные поля ввода модального окна
  let photoLink = document.querySelector('.form__item_type_link');
  let photoName = document.querySelector('.form__item_type_photo');
  // находим template элемент в разметке
  const elementsTemplate = document.querySelector('#elements__template').content;
  // находим в документе список элементов, куда будем добавлять карточку
  const elementsList = document.querySelector('.elements');
  // клонируем содержимое template
  const element = elementsTemplate.querySelector('.elements__item').cloneNode(true);
  // наполняем скопированный элемент содержимым
  element.querySelector('.elements__caption').textContent = photoName.value;
  element.querySelector('.elements__img').src = photoLink.value;
  // добавляем на страницу
  elementsList.prepend(element);

  closePopUp();
}
// пишем обработчик событий на кнопку createButton
createButton.addEventListener('click', createElement);
