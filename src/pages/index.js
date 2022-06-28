import {
  initialCards,
  cardСontainer,
  popupEdit,
  profileName,
  profileAbout,
  buttonEdit,
  inputName,
  inputAbout,
  popupAdd,
  buttonAdd,
  formValidators,
  cardConfig,
  validConfig,
  popupSelectors
} from '../scripts/utils/constants.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Card from '../scripts/components/Card.js';
import Sections from '../scripts/components/Section.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
// import UserInfo from '../scripts/components/UserInfo.js';
import './index.css';

//хендлер для клика по карточке
function handleCardClick(name, link) {
  const cardPopup = new PopupWithImage(popupSelectors.popupImageSelector, name, link);
  cardPopup.open();
  cardPopup.setEventListeners();
};

//функция по созданию карты
function createCard(array) {
  const initialCardList = new Sections({items: array, renderer: (item) => {
    const card = new Card(item, cardConfig, handleCardClick);
      const cardElement = card.generateCard();
      initialCardList.addItem(cardElement);
    }
  }, cardСontainer);
  initialCardList.renderItems();
};

//отрисовка начального массива карт
createCard(initialCards);

//при открытии popupEdit
buttonEdit.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  formClean(popupEdit);
  const popup = new PopupWithForm(
    popupSelectors.popupEditSelector,
    {callbackSubmit: (obj) => {
        profileName.textContent = obj.name;
        profileAbout.textContent = obj.about
      }
    });
  popup.setEventListeners();
  popup.open()
});

//при открытии popupAdd
buttonAdd.addEventListener("click", () => {
  formClean(popupAdd);
  const popup = new PopupWithForm(
    popupSelectors.popupAddSelector,
    {callbackSubmit: (obj) => createCard([{name: obj.caption, link: obj.link}])
    });
  popup.setEventListeners();
  popup.open();
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

// const userInfo = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__about'});
// userInfo.setUserInfo({name: "Ихарь", about: "Жеребец"});
// userInfo.getUserInfo();

enableValidation(validConfig);