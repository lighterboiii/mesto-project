export default class UserInfo {
  constructor(profileNameSelector, profileCaptionSelector, profileAvatarSelector) {
    this._profileNameSelector = profileNameSelector;
    this._profileCaptionSelector = profileCaptionSelector;
    this._profileAvatarSelector = profileAvatarSelector;
    this._name = document.querySelector(this._profileNameSelector);
    this._caption = document.querySelector(this._profileCaptionSelector);
    this._avatar = document.querySelector(this._profileAvatarSelector)
  }

  getUserInfo() {
    const data = {
      name: this._name.textContent,
      about: this._caption.textContent
    };
    return data
  }

  setAvatar(data) {
    this._avatar.src = data.avatar;
  }

  setUserInfo(data) {
    this.id = data._id;
    this._name.textContent = data.name;
    this._caption.textContent = data.about;
    this.setAvatar(data);
    this._avatar.alt = `${data.name}`;
  }
};
