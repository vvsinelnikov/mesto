export default class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo['name'] = this._name;
    userInfo['info'] = this._info;
    return userInfo;
  }

  setUserInfo(newName, newInfo) {
    this._name = newName;
    this._info = newInfo;
    this._nameElement.textContent = newName;
    this._infoElement.textContent = newInfo;
  }
}