const profileButton = document.querySelector('.profile__button'); // кнопка открытия модального окна редактирования профиля
const popup = document.querySelector('.popup'); // модальное окно редактирования профиля
const closeButton = document.querySelector('.form__close-button'); // кнопка закрытия окна редактирования профиля
const submitButton = document.querySelector('.form__button'); // кнопка "Сохранить" редактирование профиля
let profileName = document.querySelector('.profile__name'); // записал имя профиля в переменную
let profileCaption = document.querySelector('.profile__caption'); // записал описание профиля в переменную
const addPhotoButton = document.querySelector('.add-button')  // нашел кнопку открытия окна добавления карточки
const photoPopUp = document.querySelector('.popup__photo-container') // нашел модальное окно добавления карточки
const closePopUpButton = document.querySelector('.close-popup'); // нашел кнопку закрытия окна добавления карточки
const imagePopup = document.querySelector('.photo-card');

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

  function openImage() {
    const popupImage = document.querySelector('.photo-card__image');
    const popupCaption = document.querySelector('.photo-card__caption');
    popupImage.src = element.querySelector('.elements__img').src;
    popupCaption.textContent = element.querySelector('.elements__caption').textContent; // открытие созданной карточки
    imagePopup.classList.add('photo-card_opened');
  };
  const image = document.querySelector('.elements__img');
  image.addEventListener('click', openImage);

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
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1552588353-2f2cc7d429e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=778&q=80'
  },
  {
    name: 'Красная Поляна',
    link: 'https://images.unsplash.com/photo-1658170213328-c9d745df2041?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Белгород',
    link: 'https://images.unsplash.com/photo-1658170213798-080be7293ffd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2950&q=80'
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1658208004995-e75ea6e37654?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Рязань',
    link: 'https://images.unsplash.com/photo-1613411278232-e29e3506f4fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1611&q=80'
  },
  {
    name: 'Мценск',
    link: 'https://images.unsplash.com/photo-1658170213269-dc3aa8f27d0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  }
];

initialCards.forEach(function (item) { // для каждого элемента заданного массива по очереди задаем функцию добавления элемента на страницу
  let name = item.name;
  let link = item.link;
  const elementsTemplate = document.querySelector('#elements__template').content;
  const elementsList = document.querySelector('.elements');
  const element = elementsTemplate.querySelector('.elements__item').cloneNode(true);


  element.querySelector('.elements__caption').textContent = name;
  element.querySelector('.elements__img').src = link;

  elementsList.prepend(element);

  const deleteButton = document.querySelector('.delete-button'); // добавляем кнопку удаления карточки
  deleteButton.addEventListener('click', function () {
    const elementItem = deleteButton.closest('.elements__item');
    elementItem.remove();
  });

  const likeButton = document.querySelector('.like-button');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('like-button_active'); // добавляем функцию лайка карточки
  });


  function openImage() {
    const popupImage = document.querySelector('.photo-card__image');
    const popupCaption = document.querySelector('.photo-card__caption');
    popupImage.src = link;
    popupCaption.textContent = name;
    imagePopup.classList.add('photo-card_opened');
  };
  const image = document.querySelector('.elements__img');
  image.addEventListener('click', openImage); // открытие карточки

  const closeButton = document.querySelector('.photo__close-button');
  closeButton.addEventListener('click', function() {
        imagePopup.classList.remove('photo-card_opened');
      });
});


