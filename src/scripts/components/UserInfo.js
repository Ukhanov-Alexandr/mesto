export default class UserInfo {
  constructor(userInfoConfig){
    this._name = document.querySelector(userInfoConfig.nameSelector);
    this._about = document.querySelector(userInfoConfig.aboutSelector);
    this._profileAvatar = document.querySelector(userInfoConfig.avatarSelector);
  }

  setUserInfo(newUser){
    this._name.textContent = newUser.name;
    this._about.textContent = newUser.about;
  }

  setAvatar(newUser){
    this._profileAvatar.src = newUser.avatar;
    this._profileAvatar.alt = newUser.name
  }

  getUserInfo(){
    const userInfo = {
        name: this._name.textContent,
        about: this._about.textContent
    }
    return userInfo
  }
}