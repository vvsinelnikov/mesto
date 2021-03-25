export default class UserInfo {
  constructor(nameElement, infoElement, avatarImage) {
    this._nameElement = nameElement;
    this._infoElement = infoElement;
    this._avatarImage = avatarImage;
  }

  getUserInfo() {
    const userInfo = {};
    userInfo['name'] = this._nameElement.textContent;
    userInfo['info'] = this._infoElement.textContent;
    userInfo['avatar'] = this._avatarImage.src; // зачем?-)

    return userInfo;
  }

  setUserInfo(newName, newInfo) {
    if (newName) {this._nameElement.textContent = newName};
    if (newInfo) {this._infoElement.textContent = newInfo};
  }

  setAvatar(newAvatar) {
    if (newAvatar) {this._avatarImage.src = newAvatar};
  }
}