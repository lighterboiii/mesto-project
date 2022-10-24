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

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, { // отправка информации пользователя на сервер
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.caption
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

  setAvatar (data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, { // отправка аватара на сервер (в классе)
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
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
