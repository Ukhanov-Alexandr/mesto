import {
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
  userInfoConfig,
  buttonAvatar,
  popupAvatar,
  apiConfig
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

const api = new Api(apiConfig);
const userInfo = new UserInfo(userInfoConfig);
const cardPopup = new PopupWithImage(popupSelectors.popupImageSelector, popupConfig);
cardPopup.setEventListeners();

//попап для смены аватата
const popupNewAvatar = new PopupWithForm(
  popupSelectors.popupAvatarSelector,
  popupConfig,
  {callbackSubmit: (item) => {
    renderLoading(true, popupAvatar);
    api.setNewAvatar(item.link) // сохраняем новый аватар на сервере
      .then(userInfo.setNewAvatar(item))
      .catch(err => console.log(err))
      .finally(() => {
        renderLoading(false, popupAvatar);
      });
    }
  });
popupNewAvatar.setEventListeners();

//попап для user профайла
const popupProfile = new PopupWithForm(
  popupSelectors.popupEditSelector,
  popupConfig,
  {callbackSubmit: (ProfileinputValue) => {
      renderLoading(true, popupEdit);
      userInfo.setUserInfo(ProfileinputValue);
      api.patchProfile(userInfo.getUserInfo()) // сохраняем отредактированные данные профиля на сервере
        .catch(err => console.log(err))
        .finally(() => {
          renderLoading(false, popupEdit);
        });
    }
  });
popupProfile.setEventListeners();

//попап для добавления карты
const popupAddCard = new PopupWithForm(
  popupSelectors.popupAddSelector,
  popupConfig,
  {callbackSubmit: (data) => {
    renderLoading(true, popupAdd);
    // debugger;
    api.addNewCard(data)
      .then((res)=>{
        cardList.addItem(createCard(res))
      })
      .catch(err => console.log(err))
      .finally(() => {
        renderLoading(false, popupAdd);
      });
  }}
);
popupAddCard.setEventListeners();

//слушатель на Add card
buttonAdd.addEventListener("click", () => {
  formClean(popupAdd);
  // console.log(popupAdd)
  // const form = popup.querySelector(validConfig.formSelector);
  // formValidators[form.name].checkValid();
  popupAddCard.open();
});

//слушатель на аватар
buttonAvatar.addEventListener("click", () => {
  formClean(popupAvatar);
  popupNewAvatar.open();
});

//слушатель на profile Edit
buttonEdit.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  inputName.value = currentUserInfo.name;
  inputAbout.value = currentUserInfo.about;
  formClean(popupEdit);
  popupProfile.open()
});

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

//хендлер для клика по лайку
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

//процесс загрузки
function renderLoading(isLoading, popup){
  if (isLoading) {
    popup.querySelector('.popup__btn-save').textContent = 'Сохранение...';
  } else {
    popup.querySelector('.popup__btn-save').textContent = 'Сохранить'
  }
}

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
  // console.log(form)
};

enableValidation(validConfig);