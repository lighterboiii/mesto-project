import { createCard, elementsList } from '../components/card.js';
import { profileCaption, profileName, profileAvatar, profileFormCaptionInput, profileFormNameInput, fillInputContent } from '../components/utils.js';
import { renderCard } from '../pages/index.js';


const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: '79a19db7-3f97-4425-9bfc-faae1f13f72c', // конфиг
    'Content-Type': 'application/json'
  }
};
const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => res.json())
    .then((result) => {
      profileName.textContent = result.name;
      profileCaption.textContent = result.about; // подгрузка информации пользователя с сервера
      profileAvatar.src = result.avatar;
    })
};

const renderInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {  // рендер карточек с сервера
    headers: config.headers
  })
    .then(res => res.json())
    .then((res) => {
      res.forEach((item) => {
        const card = createCard(item);
        renderCard(card, elementsList);
      })
    });
};

const postCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, { // пост карточки через форму
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  });
};

const setProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, { // отправка информации пользователя на сервер
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileFormNameInput.value,
      about: profileFormCaptionInput.value
    })
  })
    .then(res => res.json())
    .then(() => {
      fillInputContent();
      closePopup(profilePopup);
    })
};
const setAvatar = () => {
  return fetch(`${config.baseUrl}/users/me/avatar`, { // отправка аватара на сервер
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarInput.value
    })
  })
    .then(res => res.json())
    .then((result) => {
      profileAvatar.src = result.avatar;
    })
};

const avatarInput = document.querySelector('.form__item-avatar'); // поле ввода формы изм-я аватара

export { getUserInfo, postCard, setProfileInfo, setAvatar, renderInitialCards };
