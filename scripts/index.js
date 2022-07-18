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
closePopUpButton.addEventListener('click', closePopUp);


// собираем добавление карточки на страницу через попап
const createButton = document.querySelector('.form__submit-button');
function createElement(evt) {
  evt.preventDefault();
  let photoLink = document.querySelector('.form__item_type_link');
  let photoName = document.querySelector('.form__item_type_photo');
  const elementsTemplate = document.querySelector('#elements__template').content;
  const elementsList = document.querySelector('.elements');
  const element = elementsTemplate.querySelector('.elements__item').cloneNode(true);

  element.querySelector('.elements__caption').textContent = photoName.value;
  element.querySelector('.elements__img').src = photoLink.value;

  elementsList.prepend(element);

  const deleteButton = document.querySelector('.delete-button'); // удаление созданной карточки
  deleteButton.addEventListener('click', function () {
    const elementItem = deleteButton.closest('.elements__item');
    elementItem.remove();
  });

  const likeButton = document.querySelector('.like-button');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('like-button_active'); // функция лайка созданной карточки
  });

  closePopUp();

  photoLink.value = '';
  photoName.value = '';
}
createButton.addEventListener('click', createElement);
// загружаем карточки на страницу
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

initialCards.forEach(function(item) { // для каждого элемента заданного массива по очереди задаем функцию добавления элемента на страницу
  let name = item.name;
  let link = item.link;
  const elementsTemplate = document.querySelector('#elements__template').content;
  const elementsList = document.querySelector('.elements');
  const element = elementsTemplate.querySelector('.elements__item').cloneNode(true);

  element.querySelector('.elements__caption').textContent = name;
  element.querySelector('.elements__img').src = link;

  elementsList.prepend(element);

  const deleteButton = document.querySelector('.delete-button'); // удаление созданной карточки
  deleteButton.addEventListener('click', function () {
    const elementItem = deleteButton.closest('.elements__item');
    elementItem.remove();
  });

  const likeButton = document.querySelector('.like-button');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('like-button_active'); // функция лайка созданной карточки
  })
});


// // находим кнопки удаления
// const deleteButtons = document.querySelectorAll('.delete-button');
// // задаем обработчик событий для каждой кнопки из коллекции
// for (let deleteButton of deleteButtons) {
//   deleteButton.addEventListener('click', function () {
//     const elementItem = deleteButton.closest('.elements__item'); // удаление уже существующей карточки
//     elementItem.remove();
//   });
// }
// // находим кнопки лайков
// const likeButtons = document.querySelectorAll('.like-button');
// // задаем обработчик событий для каждой кнопки из коллекции
// for (let likeButton of likeButtons) {
//   likeButton.addEventListener('click', function () {
//     likeButton.classList.toggle('like-button_active'); // функция лайка уже существующей карточки
//   });
// }
