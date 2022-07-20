import { data } from "autoprefixer";

export default class Api {
  constructor(config){
    this._url = config.url;
    this._headers = config.headers;
  }
  
  _checkResponse(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Возникла ошибка: ${res.status}`);
  }

  getUser(){
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
      .catch(err => console.log(err))
  }

  getCards(){
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
      .catch(err => console.log(err))
  }

  patchProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then(res => this._checkResponse(res))
      .catch(err => console.log(err))
  }

  addNewCard(data){
    return fetch(`${this._url}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
            name: data.name,
            link: data.link,
          }),
      })
      .then(res => this._checkResponse(res))
      .catch(err => console.log(err))
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._checkResponse(res))
    .catch(err => console.log(err))
  }

}
//   getData(url){
//     return fetch(this._url + url, {
//       method: "GET",
//       headers: this._header,
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         }
//         return Promise.reject(`Возникла ошибка: ${res.status}`);
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   }

