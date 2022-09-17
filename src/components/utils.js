const profilePopup = document.querySelector('.popup__profile'); // модальное окно редактирования профиля
const formItemPhotoLink = document.querySelector('.form__item_type_link');
const formItemPhotoCaption = document.querySelector('.form__item_type_photo'); // инпут с подписью к фото
const imagePopup = document.querySelector('.photo-card'); // открытое фото
const addPhotoPopup = document.querySelector('.popup__add-photo');

//  открыть модальное окно
function openPopup(popup) {
  popup.classList.add('popup_opened');
};
// закрыть модальное окно
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

export { profilePopup, formItemPhotoCaption, formItemPhotoLink, imagePopup, addPhotoPopup, closePopup, openPopup };
