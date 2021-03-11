export default class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
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
}