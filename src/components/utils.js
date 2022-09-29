// consts
const saveButton = document.querySelector('.form__button');
const openProfilePopupButton = document.querySelector('.profile__button'); // кнопка открытия модального окна редактирования профиля
const addPhotoButton = document.querySelector('.add-button')  // нашел кнопку открытия окна добавления карточки
const profileCloseButton = document.querySelector('.profile-close-button'); // кнопка закрытия окна редактирования профиля
const closeAddPhotoPopup = document.querySelector('.popup__photo-close-button'); // нашел кнопку закрытия окна добавления карточки
const closePhotoButton = document.querySelector('.photo__close-button'); // кнопка закрытия биг имейджа
const profileAvatarButton = document.querySelector('.profile__avatar-button'); // кнопка октрытия попапа аватарки
const avaCloseButton = document.querySelector('.avatar-close-button'); // кнопка закрытия попапа аватарки
const avatarEditPopup = document.querySelector('.popup__avatar'); // окнр изменения аватара
const avatarEditForm = document.querySelector('.avatar-form') // форма изменения аватара
const avatarInput = document.querySelector('.form__item-avatar'); // поле ввода формы изм-я аватара
const profilePopup = document.querySelector('.popup__profile'); // модальное окно редактирования профиля
const formItemPhotoLink = document.querySelector('.form__item_type_link');
const formItemPhotoCaption = document.querySelector('.form__item_type_photo'); // инпут с подписью к фото
const addPhotoPopup = document.querySelector('.popup__add-photo');
const profileFormNameInput = document.querySelector('.form__item_type_name');
const profileFormCaptionInput = document.querySelector('.form__item_type_job');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const addCardForm = document.querySelector('.card-form'); // форма создания карточки
const profileAvatar = document.querySelector('.profile__avatar');
const openedImage = document.querySelector('.photo-card__image'); // фото полноразмерное
const openedImageCaption = document.querySelector('.photo-card__caption'); // описание полноращмерного фото
const elementsList = document.querySelector('.elements');
const imagePopup = document.querySelector('.photo-card'); // открытое фото
const elementsTemplate = document.querySelector('#elements__template').content;
const profileSubmitButton = document.querySelector('.profile-submit-button'); // сабмит-кнопка профиля
const createCardButton = document.querySelector('.create-card-button'); // кнопка сабмита карточки
const avatarSubmitButton = document.querySelector('.avatar-button'); // сабмит-кнопка аватарки
const areUSurePopup = document.querySelector('.popup__delete'); // попап подтверждения удаления карточки
const yesButton = document.querySelector('.yes-button'); // кнопка "да" попапа удаления
const deleteForm = document.querySelector('.delete-form');

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
  profileCloseButton,
  closeAddPhotoPopup,
  closePhotoButton,
  profileAvatarButton,
  avaCloseButton,
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
  yesButton,
  deleteForm
};
