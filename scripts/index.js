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
// константы
const profileButton = document.querySelector('.profile__button'); // кнопка открытия модального окна редактирования профиля
const profilePopup = document.querySelector('.popup__profile'); // модальное окно редактирования профиля (заменил имя переменной с popup и нашел эл-т по уникальному селектору)
const profileCloseButton = document.querySelector('.profile-close-button'); // кнопка закрытия окна редактирования профиля (заменил имя переменной и селектор поиска на более уникальный)
const profileSubmitButton = document.querySelector('.profile-submit-button'); // кнопка "Сохранить" редактирование профиля (заменил имя и селектор)
const profileName = document.querySelector('.profile__name'); // записал имя профиля в переменную
const profileCaption = document.querySelector('.profile__caption'); // записал описание профиля в переменную
const formName = document.querySelector('.form__item_type_name'); // инпут "имя" редактирования профиля
const formJob = document.querySelector('.form__item_type_job'); // инпут "о себе" редактирования профеля
const addPhotoButton = document.querySelector('.add-button')  // нашел кнопку открытия окна добавления карточки
const addPhotoPopup = document.querySelector('.popup__add-photo') // нашел модальное окно добавления карточки
const closePopupButton = document.querySelector('.popup__photo-close-button'); // нашел кнопку закрытия окна добавления карточки
const imagePopup = document.querySelector('.photo-card'); // открытое фото
const openedImage = document.querySelector('.photo-card__image');
const openedImageCaption = document.querySelector('.photo-card__caption');
const createCardButton = document.querySelector('.create-card-button'); // кнопка "создать" карточку с фото
const elementsTemplate = document.querySelector('#elements__template').content; // получаем контент темплейт
const element = elementsTemplate.querySelector('.elements__item').cloneNode(true);
const elementsList = document.querySelector('.elements'); // контейнер для рендера карточек
const formItemLink = document.querySelector('.form__item_type_link'); // инпут с ссылкой на фото
const formItemName = document.querySelector('.form__item_type_photo'); // инпут с подписью к фото
const addCardForm = document.querySelector('.card-form'); // форма создания карточки
const closePhotoButton = document.querySelector('.photo__close-button'); // кнопка закрытия полноразмерного изображения


// функции
function openPopup(popup) { //  открыть модальное окно
  popup.classList.add('popup_opened');
};
function closePopup(popup) { // закрыть модальное окно
  popup.classList.remove('popup_opened');
};
function submitProfileForm(event) { // отправить данные в профайл
  event.preventDefault();
  profileName.textContent = formName.value;
  profileCaption.textContent = formJob.value;
  closePopup(profilePopup);
};
function createCard(data) { // функция создания карточки
  const element = elementsTemplate.querySelector('.elements__item').cloneNode(true);
  element.querySelector('.elements__caption').textContent = data.name;
  element.querySelector('.elements__img').src = data.link;
  element.querySelector('.elements__img').alt = data.name;
  const deleteButton = element.querySelector('.delete-button'); // удаление созданной карточки
  deleteButton.addEventListener('click', function () {
    const elementItem = deleteButton.closest('.elements__item');
    elementItem.remove();
  });
  const likeButton = element.querySelector('.like-button');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('like-button_active'); // функция лайка созданной карточки
  });
  function openImage(evt) {
    openedImage.src = evt.target.getAttribute('src');
    openedImageCaption.textContent = evt.target.getAttribute('alt');
    imagePopup.classList.add('photo-card_opened');
  };
  const image = element.querySelector('.elements__img');
  image.addEventListener('click', openImage);
  return element;
};
function renderCard(card, container) {
  container.prepend(card); // отрисовка карточки в контейнере
};
function submitCardForm(evt) {
  evt.preventDefault();
  data = {
    name: document.querySelector('.form__item_type_photo').value, // сабмит формы добавления карточки
    link: document.querySelector('.form__item_type_link').value
  };
  const card = createCard(data);
  renderCard(card, elementsList);
  closePopup(addPhotoPopup);
  formItemLink.value = '';
  formItemName.value = '';
};
initialCards.forEach(function (item) {
  const card = createCard(item);
  renderCard(card, elementsList);  // отрисовка карточек из массива
});


// слушатели событий
profileButton.addEventListener('click', (function() {
  formName.value = profileName.textContent;
  formJob.value = profileCaption.textContent;
  openPopup(profilePopup);
}));
profileCloseButton.addEventListener('click', () => closePopup(profilePopup));
profileSubmitButton.addEventListener('click', submitProfileForm);
addPhotoButton.addEventListener('click', () => openPopup(addPhotoPopup));
closePopupButton.addEventListener('click', () => {
  formItemLink.value = '';
  formItemName.value = '';
  closePopup(addPhotoPopup)
});
addCardForm.addEventListener('submit', submitCardForm);
closePhotoButton.addEventListener('click', function () {
  imagePopup.classList.remove('photo-card_opened');
});

// пробуем закрывать на Esc
closeByEsc(profilePopup);
closeByEsc(addPhotoPopup);

function closeByEsc (popup) {
  addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  })
}
addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    imagePopup.classList.remove('photo-card_opened');
  }
})
// пробуем закрывать на оверлей
const page = document.querySelector('.page');

page.addEventListener('click', function (evt) {
  closePopup(evt.target);
  evt.target.classList.remove('photo-card_opened');
})
