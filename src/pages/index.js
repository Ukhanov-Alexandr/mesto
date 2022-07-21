import {
  initialCards,
  cardСontainer,
  popupEdit,
  buttonEdit,
  inputName,
  inputAbout,
  popupAdd,
  buttonAdd,
  formValidators,
  cardConfig,
  validConfig,
  popupSelectors,
  popupConfig,
  userInfoConfig
} from '../scripts/utils/constants.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Card from '../scripts/components/Card.js';
import Sections from '../scripts/components/Section.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
import './index.css';



const cardPopup = new PopupWithImage(popupSelectors.popupImageSelector, popupConfig);
cardPopup.setEventListeners();

//Новая секция 
// const cardSection = new Sections({
//   items: initialCards,
//   renderer: (item) => {
//     const card = createCard(item);
//     cardSection.addItem(card)
//   }
// }, cardСontainer);
// cardSection.renderItems();

const userInfo = new UserInfo(userInfoConfig);

const popupProfile = new PopupWithForm(
  popupSelectors.popupEditSelector,
  popupConfig,
  {callbackSubmit: (ProfileinputValue) => {
      userInfo.setUserInfo(ProfileinputValue);
      api.patchProfile(userInfo.getUserInfo());  // сохраняем отредактированные данные профиля на сервере
    }
  });
popupProfile.setEventListeners();

//при открытии popupEdit
buttonEdit.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  inputName.value = currentUserInfo.name;
  inputAbout.value = currentUserInfo.about;
  formClean(popupEdit);
  popupProfile.open()
});

// const popupAddCard = new PopupWithForm(
//   popupSelectors.popupAddSelector,
//   popupConfig,
  // {callbackSubmit: (obj) => {
  //   cardSection.addItem(createCard(obj));
  //   }
  // }
// );
// popupAddCard.setEventListeners();

//при открытии popupAdd
buttonAdd.addEventListener("click", () => {
  formClean(popupAdd);
  popupAddCard.open();
});

//функция создает экземпляры FormValidator, кладет их в объект formValidators,
//включает валидацию форм
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validity = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validity
    validity.enableValidation();
  });
};

//функция очищает форму 
const formClean = (popup) => {
  const form = popup.querySelector(validConfig.formSelector);
  formValidators[form.name].checkValid();
};

enableValidation(validConfig);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//хендлер для клика по карточке
function handleCardClick(name, link) {
  cardPopup.open(name, link);
};

//функция по созданию карты
function createCard(item) {
  const card = new Card(item, cardConfig, handleCardClick, handleTrashClick, userInfo.getUserInfo().userId, handleLikeClick);
    return card.generateCard();
};
// const profile = document.querySelector('.profile');
// const profileName = profile.querySelector(".profile__name");
// const profileAbout = profile.querySelector(".profile__about");
// const profileAvatar = profile.querySelector('.profile__avatar');


const apiConfig = {
  url: "https://nomoreparties.co/v1/cohort-45",
  headers: {
    authorization: "672e954f-60da-45a7-8529-433a3c093bb6",
    "Content-Type": "application/json",
  },
};

const api = new Api(apiConfig);

//Загрузка информации о пользователе с сервера
api.getUser()
  .then((userData) => {
    // console.log(userData)
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData);
    // userId.id = userData._id;
  })
  .catch(err => console.log(err));


//секция для карточек
const cardList = new Sections({
  renderer: (item) => {
    cardList.addItem(createCard(item))
  }
}, cardСontainer);
// cardList.renderItems();
   

//Загрузка карточек с сервера
api.getCards()
  .then((cards) => {
    // console.log(cards)
    cardList.renderItems(cards.reverse())
  })
  .catch(err => console.log(err));


function addCardHandler(data){
  api.addNewCard(data)
    .then((res)=>{
      cardList.addItem(createCard(res))
    })
    .catch(err => console.log(err));
}

const popupAddCard = new PopupWithForm(
  popupSelectors.popupAddSelector,
  popupConfig,
  {callbackSubmit: addCardHandler}
);
popupAddCard.setEventListeners();

//хендлер для клика по корзине
function handleTrashClick(cardId){
  deletePopup.open();
  deletePopup.submitHendler(() => {
    api.deleteCard(cardId)
    .then(() => {
      // console.log(this)
      this.deleteCardHandler();
    })
    .catch(err => console.log(err));
  });
}

//экземпляр попапа с удалением
const deletePopup = new PopupWithConfirmation (popupSelectors.popupDeleteSelector, popupConfig);
deletePopup.setEventListeners();

function handleLikeClick(cardId){
  if (this._checkContainsActiveClass()) {
    api.unlikeCard(cardId)
      .then((arr) => {
        // console.log(arr.likes)
        this.updatelikes(arr)
      })
      .catch(err => console.log(err))
  } else {
    api.setlikeCard(cardId)
      .then((arr)=>{
        // console.log(arr.likes)
        this.updatelikes(arr)
      })
      .catch(err => console.log(err));
  }
}

// function setlike(cardId) {
//   api.setlikeCard(cardId)
//     .then((arr)=>{
//       // console.log(`лайки ${arr}`);
//       // console.log(arr.likes);
//       // console.log(arr.likes.length);
//       this.updatelikes(arr)
//     })
//     .catch(err => console.log(err));
// };

// function unLike(cardId){
//   api.unlikeCard(cardId)
//     .then((arr) => {
//       // console.log(arr.likes);
//       // console.log(arr.likes.length);
//       this.updatelikes(arr)
//     })
//     .catch(err => console.log(err));
// }