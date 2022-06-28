export default class UserInfo {
  constructor({nameSelector, aboutSelector}){
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
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
    console.log(userInfo);
    return userInfo
  }
}