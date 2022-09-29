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
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
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
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {  // рендер карточек с сервера
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
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
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

const setAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, { // отправка аватара на сервер
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

const setLike = (data) => { // работает
  return fetch(`${config.baseUrl}/cards/likes/${data._id}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

const deleteLike = (data) => { // работает
  return fetch(`${config.baseUrl}/cards/likes/${data._id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};


const deleteCard = (data) => {
  return fetch(`${config.baseUrl}/cards/${data._id}`, { // исправить
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
};


export { getUserInfo, postCard, setUserInfo, setAvatar, getInitialCards, deleteCard, setLike, deleteLike };
