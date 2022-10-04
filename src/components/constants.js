// consts
const addCardForm = document.forms['card-form']; // форма создания карточки
const addPhotoButton = document.querySelector('.add-button')  // кнопка открытия окна добавления карточки
const addPhotoPopup = document.querySelector('.popup__add-photo');
const areUSurePopup = document.querySelector('.popup__delete'); // попап подтверждения удаления карточки
const avatarEditForm = document.forms['avatar-form'] // форма изменения аватара
const avatarEditPopup = document.querySelector('.popup__avatar'); // окнр изменения аватара
const avatarInput = document.querySelector('.form__item-avatar'); // поле ввода формы изм-я аватара
const avatarSubmitButton = document.querySelector('.avatar-button'); // сабмит-кнопка аватарки
const createCardButton = document.querySelector('.create-card-button'); // кнопка сабмита карточки
const elementsList = document.querySelector('.elements');
const elementsTemplate = document.querySelector('#elements__template').content;
const formItemPhotoCaption = document.querySelector('.form__item_type_photo'); // инпут с подписью к фотоs
const formItemPhotoLink = document.querySelector('.form__item_type_link');
const imagePopup = document.querySelector('.photo-card'); // открытое фото
const openedImage = document.querySelector('.photo-card__image'); // фото полноразмерное
const openedImageCaption = document.querySelector('.photo-card__caption'); // описание полноразмерного фото
const openProfilePopupButton = document.querySelector('.profile__button'); // кнопка открытия модального окна редактирования профиля
const profileAvatar = document.querySelector('.profile__avatar');
const profileAvatarButton = document.querySelector('.profile__avatar-button'); // кнопка октрытия попапа аватарки
const profileCaption = document.querySelector('.profile__caption');
const profileFormCaptionInput = document.querySelector('.form__item_type_job');
const profileFormNameInput = document.querySelector('.form__item_type_name');
const profileName = document.querySelector('.profile__name');
const profilePopup = document.querySelector('.popup__profile'); // модальное окно редактирования профиля
const profileSubmitButton = document.querySelector('.profile-submit-button'); // сабмит-кнопка профиля
const saveButton = document.querySelector('.form__button');
const popups = document.querySelectorAll('.popup')

export {
  profileAvatar,
  profileName,
  profileCaption,
  addCardForm,
  profilePopup,
  formItemPhotoCaption,
  formItemPhotoLink,
  addPhotoPopup,
  profileFormNameInput,
  profileFormCaptionInput,
  saveButton,
  openProfilePopupButton,
  addPhotoButton,
  profileAvatarButton,
  avatarEditForm,
  avatarEditPopup,
  avatarInput,
  openedImage,
  openedImageCaption,
  elementsList,
  imagePopup,
  elementsTemplate,
  profileSubmitButton,
  createCardButton,
  avatarSubmitButton,
  areUSurePopup,
  popups
};
