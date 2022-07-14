let profileButton = document.querySelector('.profile__button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.form__close-button');
let submitButton = document.querySelector('.form__button');
let profileContainer = document.querySelector('.profile__container');
let profileName = document.querySelector('.profile__name');
let profileCaption = document.querySelector('.profile__caption');


function popupOpen() {
  popup.classList.add('popup_opened');
  let formName = document.querySelector('.form__item_type_name');
  let formJob = document.querySelector('.form__item_type_job');

  formName.value = profileName.textContent;
  formJob.value = profileCaption.textContent;
}
function popupClose() {
  popup.classList.remove('popup_opened');
}
function formSubmitHandler(evt) {
  evt.preventDefault();
  let formName = document.querySelector('.form__item_type_name');
  let formJob = document.querySelector('.form__item_type_job');

  profileName.textContent = formName.value;
  profileCaption.textContent = formJob.value;

  popupClose();
}

profileButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
submitButton.addEventListener('click', formSubmitHandler);
// Массив для создания 6 карточек при загрузке страницы. Взять другие картинки с unsplash
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
