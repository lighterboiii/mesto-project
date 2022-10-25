export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };


  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {  // рендер карточек с сервера
      headers: this._headers
    })
      .then(this._checkResponse)
  };

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {  // получение информации пользователя
      headers: this._headers
    })
      .then(this._checkResponse)
  };

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, { // отправка информации пользователя на сервер
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.activity
      })
    })
      .then(this._checkResponse)
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
      .then(this._checkResponse)
  };

  setLike(data) { // постановка лайка
    return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkResponse)
  };

  deleteLike(data) {  // снятие лайка
    return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse)
  };

  setAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, { // отправка аватара на сервер (в классе)
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._checkResponse)
  };

  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data}`, { // удаление карточки
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse)
  };

  getAllData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  };
};
