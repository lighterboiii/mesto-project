import { checkResponse } from "./utils.js";

export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {  // рендер карточек с сервера
      headers: this._headers
    })
      .then(checkResponse)
  };

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {  // получение информации пользователя
      headers: this._headers
    })
      .then(checkResponse)
  };

  setUserInfo(name, caption) {
    return fetch(`${this._baseUrl}/users/me`, { // отправка информации пользователя на сервер
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: caption
      })
    })
      .then(checkResponse)
  };

  postCard(data) {
    return fetch(`${this._baseUrl}/cards`, { // пост карточки через форму
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(checkResponse)
  };

  setLike(data) { // постановка лайка
    return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(checkResponse)
  };

  deleteLike(data) {  // снятие лайка
    return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(checkResponse)
  };

  setAvatar (avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, { // отправка аватара на сервер (в классе)
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(checkResponse)
  };

  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data}`, { // удаление карточки
      method: 'DELETE',
      headers: this._headers
    })
      .then(checkResponse)
  };

  getAllData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  };
};

// // отсюда удалить после рефактора
// const config = {
//   baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
//   headers: {
//     authorization: '79a19db7-3f97-4425-9bfc-faae1f13f72c', // конфиг
//     'Content-Type': 'application/json'
//   }
// };

// const getUserInfo = () => {
//   return fetch(`${config.baseUrl}/users/me`, {  // получение информации пользователя (в классе)
//     headers: config.headers
//   })
//     .then(checkResponse)
// };

// const setUserInfo = (name, caption) => {
//   return fetch(`${config.baseUrl}/users/me`, { // отправка информации пользователя на сервер (в классе)
//     method: 'PATCH',
//     headers: config.headers,
//     body: JSON.stringify({
//       name: name,
//       about: caption
//     })
//   })
//     .then(checkResponse)
// };

// const getInitialCards = () => {
//   return fetch(`${config.baseUrl}/cards`, {  // рендер карточек с сервера (в классе)
//     headers: config.headers
//   })
//     .then(checkResponse)
// };

// const postCard = (name, link) => {
//   return fetch(`${config.baseUrl}/cards`, { // пост карточки через форму (в классе)
//     method: 'POST',
//     headers: config.headers,
//     body: JSON.stringify({
//       name: name,
//       link: link
//     })
//   })
//     .then(checkResponse)
// };

// const setAvatar = (avatar) => {
//   return fetch(`${config.baseUrl}/users/me/avatar`, { // отправка аватара на сервер (в классе)
//     method: 'PATCH',
//     headers: config.headers,
//     body: JSON.stringify({
//       avatar: avatar
//     })
//   })
//     .then(checkResponse)
// };

// const setLike = (data) => { // постановка лайка (в классе)
//   return fetch(`${config.baseUrl}/cards/likes/${data._id}`, {
//     method: 'PUT',
//     headers: config.headers
//   })
//     .then(checkResponse)
// };

// const deleteLike = (data) => {  // снятие лайка (в классе)
//   return fetch(`${config.baseUrl}/cards/likes/${data._id}`, {
//     method: 'DELETE',
//     headers: config.headers
//   })
//     .then(checkResponse)
// };


// const deleteCard = (data) => {
//   return fetch(`${config.baseUrl}/cards/${data}`, { // удаление карточки (в классе)
//     method: 'DELETE',
//     headers: config.headers
//   })
//     .then(checkResponse)
// };


// export { getUserInfo, postCard, setUserInfo, setAvatar, getInitialCards, deleteCard, setLike, deleteLike };
