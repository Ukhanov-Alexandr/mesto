import {
  initialCards,
  legends,
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
import './index.css';

//хендлер для клика по карточке
function handleCardClick(name, link) {
  cardPopup.open(name, link);
};

//функция по созданию карты
function createCard(item) {
  const card = new Card(item, cardConfig, handleCardClick);
    return card.generateCard();
};

const cardPopup = new PopupWithImage(popupSelectors.popupImageSelector, popupConfig);
cardPopup.setEventListeners();

const cardSection = new Sections({
  items: legends,
  renderer: (item) => {
    const card = createCard(item);
    cardSection.addItem(card)
  }
}, cardСontainer);
cardSection.renderItems();

const userInfo = new UserInfo(userInfoConfig);

const popupProfile = new PopupWithForm(
  popupSelectors.popupEditSelector,
  popupConfig,
  {callbackSubmit: (ProfileinputValue) => {
      userInfo.setUserInfo(ProfileinputValue);
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

const popupAddCard = new PopupWithForm(
  popupSelectors.popupAddSelector,
  popupConfig,
  {callbackSubmit: (obj) => {
    cardSection.addItem(createCard(obj));
    }
  }
);
popupAddCard.setEventListeners();

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