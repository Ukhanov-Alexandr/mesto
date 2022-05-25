const popupEdit = document.querySelector(".popup");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const buttonEdit = document.querySelector(".profile__btn_type_edit");
const popupForm = document.querySelector(".popup__form");
const buttonClosePopup = document.querySelector(".popup__btn-close");
const inputName = document.querySelector(".popup__input_type_name");
const inputAbout = document.querySelector(".popup__input_type_about");

//функция открывает попап
function openPopup (popup) {
  popup.classList.add("popup_opened");
};

//функция закрывает попап
function closePopup (popup) {
  popup.classList.remove("popup_opened");
};

//функция закрывает попап при клике на оверлей
function closePopupOverlay (popup) {
  popup.addEventListener('mousedown', (evt) => {
    closePopup(evt.target);
  });
};

//функция закрывает попап на esc
function closePopupEsc (popup) {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === "Escape") closePopup(popup);
  });
};

//при открытии popupEdit
buttonEdit.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  checkValid(config, popupEdit);
  openPopup(popupEdit);
  closePopupOverlay(popupEdit);
  closePopupEsc(popupEdit);
});

//хендлер для edit
function editHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupEdit);
};

popupForm.addEventListener("submit", editHandler)
buttonClosePopup.addEventListener("click", () => {
  closePopup(popupEdit);
});


// ниже - функционал 5го спринта
const cardTemplate = document.querySelector('.elements-template').content;
const cardСontainer = document.querySelector('.elements');
const popupAdd = document.querySelector(".popup-add");
const buttonAdd = document.querySelector(".profile__btn_type_add");
const buttonCloseAdd = popupAdd.querySelector(".popup-add__btn-close");
const popupFormAdd =  popupAdd.querySelector(".popup-add__form");
const inputCaption = popupAdd.querySelector(".popup-add__input_type_caption");
const inputLink = popupAdd.querySelector(".popup-add__input_type_link");
const popupImage = document.querySelector(".popup-image");
const buttonClosePopupImage = popupImage.querySelector(".popup-image__btn-close");
const imageView = popupImage.querySelector(".popup-image__image");
const imageCaption = popupImage.querySelector(".popup-image__caption");

//функция добавляет готовые катрочки
function cardRender (card) {
  cardСontainer.prepend(card);
};

//функция по созданию карточки
function cardCreate (title, link) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  const like = card.querySelector(".element__btn-heart");
  const trash = card.querySelector(".element__trash");
  const image = card.querySelector(".element__img");
  card.querySelector('.element__caption').textContent = title;
  card.querySelector('.element__img').src = link;
  image.alt = `Фото ${title}`;
  like.addEventListener("click", () => like.classList.toggle("element__btn-heart_active"));
  image.addEventListener("click", () => {
    openPopup(popupImage);
    imageView.src = link;
    imageView.alt = `Фото ${title}`;
    imageCaption.textContent = title;
    closePopupOverlay(popupImage);
    closePopupEsc (popupImage);
  });
  trash.addEventListener("click", () => card.remove());
  return card;
};

initialCards.forEach ((item) => {
  const title = item.name;
  const link = item.link;
  cardRender (cardCreate(title, link));
});

//хендлер для add
function addtHandler (evt) {
  evt.preventDefault();
  const title = inputCaption.value;
  const link = inputLink.value;
  cardRender (cardCreate(title, link));
  closePopup(popupAdd);
  popupFormAdd.reset();
};

//при открытии popupAdd
buttonAdd.addEventListener("click", () => {
  popupFormAdd.reset();
  checkValid(config, popupAdd);
  openPopup(popupAdd);
  closePopupOverlay(popupAdd);
  closePopupEsc(popupAdd);
});

buttonCloseAdd.addEventListener("click", () => {
  closePopup(popupAdd);
});
popupFormAdd.addEventListener("submit", addtHandler);
buttonClosePopupImage.addEventListener("click", () => closePopup(popupImage));