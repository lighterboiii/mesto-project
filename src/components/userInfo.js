export class UserInfo {
  constructor(userNameSelector, userCaptionSelector) {
    this._userName = userNameSelector;
    this._userCaption = userCaptionSelector;
  }

  getUserInfo() {
    const userData = {
      name: this._userName,
      caption: this._userCaption
    };
    return userData;
  }

  setUserInfo(userData) {
    this._userName.textContent = userData.name;
    this._userCaption = userData.caption;
  }
};
