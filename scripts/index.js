const popup = document.querySelector(".popup");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const btnEdit = document.querySelector(".profile__btn_type_edit");
const popupForm = document.querySelector(".popup__form");
const btnClosePopup = document.querySelector(".popup__btn-close");
const inputName = document.querySelector(".popup__input_type_name");
const inputAbout = document.querySelector(".popup__input_type_about");

function popupToggle () {
    popup.classList.toggle("popup_opened");
}

function popupOpen () {
    popupToggle();
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent; 
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    popupToggle();
};

btnEdit.addEventListener("click", popupOpen);
btnClosePopup.addEventListener("click", popupToggle);
popupForm.addEventListener("submit", formSubmitHandler);

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardTemplate = document.querySelector('.elements-template').content;
const cards = document.querySelector('.elements');
const imageTemplate = document.querySelector(".popup-image-template").content;
const popupPlace = document.querySelector(".popup-place");

initialCards.forEach((item) => {
    const card = cardTemplate.querySelector('.element').cloneNode(true);
    const like = card.querySelector(".element__btn-heart");
    const trash = card.querySelector(".element__trash");
    const image = card.querySelector(".element__img");
    const popupImage = imageTemplate.querySelector('.popup-image').cloneNode(true);
    const btnClosePopupImage = popupImage.querySelector('.popup-image__btn-close');
    const closeButton = (evt) => {
      evt.target.closest('.popup-image').classList.toggle("popup_opened");
    };
    card.querySelector('.element__caption').textContent = item.name;
    card.querySelector('.element__img').src = item.link;
    card.querySelector('.element__img').alt = `Фото ${item.name}`;
    cards.append(card);
    like.onclick = () => like.classList.toggle("element__btn-heart_active");
    trash.onclick = () => card.remove();
    popupImage.querySelector('.popup-image__image').src = item.link;
    popupImage.querySelector('.popup-image__caption').textContent = item.name;
    popupPlace.append(popupImage);
    image.onclick = () => popupImage.classList.toggle("popup_opened");
    btnClosePopupImage.addEventListener("click", closeButton);
});

const popupAdd = document.querySelector(".popup-add");
const btnAdd = document.querySelector(".profile__btn_type_add");
const btnCloseAdd = popupAdd.querySelector(".popup-add__btn-close");
const popupFormAdd =  popupAdd.querySelector(".popup-add__form");
const inputCaption = popupAdd.querySelector(".popup-add__input_type_caption");
const inputLink = popupAdd.querySelector(".popup-add__input_type_link");
const btnSaveAdd = popupAdd.querySelector(".popup-add__btn-save");


function popupAddToggle () {
    popupAdd.classList.toggle("popup_opened");
}

function formAddtHandler (evt) {
    evt.preventDefault();
    const card = cardTemplate.querySelector('.element').cloneNode(true);
    const like = card.querySelector(".element__btn-heart");
    const trash = card.querySelector(".element__trash");
    const image = card.querySelector(".element__img");
    const popupImage = imageTemplate.querySelector('.popup-image').cloneNode(true);
    const btnClosePopupImage = popupImage.querySelector('.popup-image__btn-close');
    const closeButton = (evt) => {
      evt.target.closest('.popup-image').classList.toggle("popup_opened");
    };
    card.querySelector('.element__caption').textContent = inputCaption.value;
    card.querySelector('.element__img').src = inputLink.value;
    card.querySelector('.element__img').alt = `Фото ${inputCaption.value}`;
    cards.prepend(card);
    like.onclick = () => like.classList.toggle("element__btn-heart_active");
    trash.onclick = () => card.remove();
    popupAddToggle();
    popupImage.querySelector('.popup-image__image').src = inputLink.value;
    popupImage.querySelector('.popup-image__caption').textContent = inputCaption.value;
    popupPlace.append(popupImage);
    image.onclick = () => popupImage.classList.toggle("popup_opened");
    btnClosePopupImage.addEventListener("click", closeButton);
};

btnAdd.addEventListener("click", popupAddToggle);
btnCloseAdd.addEventListener("click", popupAddToggle);
btnSaveAdd.addEventListener("click", formAddtHandler);