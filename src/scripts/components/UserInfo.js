export default class UserInfo {
  constructor(userInfoConfig){
    this._name = document.querySelector(userInfoConfig.nameSelector);
    this._about = document.querySelector(userInfoConfig.aboutSelector);
  }

  setUserInfo(newUser){
    this._name.textContent = newUser.name;
    this._about.textContent = newUser.about;
  }

  getUserInfo(){
    const userInfo = {
        name: this._name.textContent,
        about: this._about.textContent
    }
    return userInfo
  }
}