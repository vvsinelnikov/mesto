export default class UserInfo {
  constructor(nameSelector, infoSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo['name'] = userInfo['name'] = this._nameElement.textContent;
    userInfo['info'] = userInfo['info'] = this._infoElement.textContent;
    return userInfo;
  }

  setUserInfo(newName, newInfo) {
    this._nameElement.textContent = newName;
    this._infoElement.textContent = newInfo;
  }

  setAvatar(newAvatar) {
    this._avatarElement.src = newAvatar;
  }
}