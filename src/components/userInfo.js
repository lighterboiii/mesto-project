export default class UserInfo {
  constructor(userName, userCaption, userAvatar) {
    this._userName = userName;
    this._userCaption = userCaption;
    this._userAvatar = userAvatar;
    this._name = document.querySelector(this._userName);
    this._caption = document.querySelector(this._userCaption);
    this._avatar = document.querySelector(this._userAvatar)
  }

  getUserInfo() {
    const data = {
      name: this._name.textContent,
      about: this._caption.textContent
    };
    return data;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._caption.textContent = data.about;
    this.setUserAvatar(data);
    this._avatar.alt = `${data.name}`;
  }
};
