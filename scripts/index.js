const cardTemplate = document.querySelector('.elements-template').content;
const cardСontainer = document.querySelector('.elements');

const popupEdit = document.querySelector(".popup-edit");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const buttonEdit = document.querySelector(".profile__btn_type_edit");
const popupFormEdit = popupEdit.querySelector(".popup__form");
const buttonClosePopupEdit = popupEdit.querySelector(".popup__btn-close");
const inputName = popupEdit.querySelector(".popup__input_type_name");
const inputAbout = popupEdit.querySelector(".popup__input_type_about");

const popupAdd = document.querySelector(".popup-add");
const buttonAdd = document.querySelector(".profile__btn_type_add");
const buttonCloseAdd = popupAdd.querySelector(".popup__btn-close");
const popupFormAdd =  popupAdd.querySelector(".popup__form");
const inputCaption = popupAdd.querySelector(".popup__input_type_caption");
const inputLink = popupAdd.querySelector(".popup__input_type_link");

const popupImage = document.querySelector(".popup-image");
const buttonClosePopupImage = popupImage.querySelector(".popup__btn-close");
const imageView = popupImage.querySelector(".popup-image__image");
const imageCaption = popupImage.querySelector(".popup-image__caption");

//функция открывает попап + вешает слушатель на esc
function openPopup (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEsc);
};

//функция закрывает попап и удаляет ненужные слушатели
function closePopup (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEsc);
  popup.removeEventListener('mousedown', handleOverlayClick);
};

// функция закрывает попап при клике на оверлей
const handleOverlayClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  };
};

// функция закрывает попап на esc
function closeByEsc (evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

//при открытии popupEdit
buttonEdit.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  checkValid(popupEdit, config);
  popupEdit.addEventListener('mousedown', handleOverlayClick);
  openPopup(popupEdit);
});

//хендлер для формы edit
function handleEditSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupEdit);
};

popupFormEdit.addEventListener("submit", handleEditSubmit)
buttonClosePopupEdit.addEventListener("click", () => {
  closePopup(popupEdit);
  popupEdit.removeEventListener('mousedown', handleOverlayClick);
});


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
    imageView.src = link;
    imageView.alt = `Фото ${title}`;
    imageCaption.textContent = title;
    openPopup(popupImage);
    popupImage.addEventListener('mousedown', handleOverlayClick);
  });
  trash.addEventListener("click", () => card.remove());
  return card;
};

initialCards.forEach ((item) => {
  const title = item.name;
  const link = item.link;
  cardRender (cardCreate(title, link));
});

//хендлер для формы add
function handleAddSubmit (evt) {
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
  checkValid(popupAdd, config);
  openPopup(popupAdd);
  popupAdd.addEventListener('mousedown', handleOverlayClick);
});

buttonCloseAdd.addEventListener("click", () => {
  closePopup(popupAdd);
});
popupFormAdd.addEventListener("submit", handleAddSubmit);
buttonClosePopupImage.addEventListener("click", () => {
  closePopup(popupImage);
  popupImage.removeEventListener('mousedown', handleOverlayClick);
});