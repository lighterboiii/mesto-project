import { checkResponse } from "../components/utils.js";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: '79a19db7-3f97-4425-9bfc-faae1f13f72c', // конфиг
    'Content-Type': 'application/json'
  }
};

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {  // получение информации пользователя
    headers: config.headers
  })
    .then(checkResponse)
};

const setUserInfo = (name, caption) => {
  return fetch(`${config.baseUrl}/users/me`, { // отправка информации пользователя на сервер
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: caption
    })
  })
    .then(checkResponse)
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {  // рендер карточек с сервера
    headers: config.headers
  })
    .then(checkResponse)
};

const postCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, { // пост карточки через форму
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(checkResponse)
};

const setAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, { // отправка аватара на сервер
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
    .then(checkResponse)
};

const setLike = (data) => { // постановка лайка
  return fetch(`${config.baseUrl}/cards/likes/${data._id}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(checkResponse)
};

const deleteLike = (data) => {  // снятие лайка
  return fetch(`${config.baseUrl}/cards/likes/${data._id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(checkResponse)
};


const deleteCard = (data) => {
  return fetch(`${config.baseUrl}/cards/${data}`, { // удаление карточки
    method: 'DELETE',
    headers: config.headers
  })
    .then(checkResponse)
};


export { getUserInfo, postCard, setUserInfo, setAvatar, getInitialCards, deleteCard, setLike, deleteLike };
