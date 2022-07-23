export default class UserInfo {
  constructor(userInfoConfig){
    this._name = document.querySelector(userInfoConfig.nameSelector);
    this._about = document.querySelector(userInfoConfig.aboutSelector);
    this._profileAvatar = document.querySelector(userInfoConfig.avatarSelector);
  }

  setUserInfo({ name, about, _id }){
    this._name.textContent = name;
    this._about.textContent = about;
    this._userId = _id;
  }

  setAvatar(newUser, link){
    this._profileAvatar.src = link;
    this._profileAvatar.alt = newUser.name;
  }

  getUserInfo(){
    const userInfo = {
        name: this._name.textContent,
        about: this._about.textContent,
        userId: this._userId
    }
    return userInfo
  }
}