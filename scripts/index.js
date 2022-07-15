const profileButton = document.querySelector('.profile__button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.form__close-button');
const submitButton = document.querySelector('.form__button');
const profileContainer = document.querySelector('.profile__container');
let profileName = document.querySelector('.profile__name');
let profileCaption = document.querySelector('.profile__caption');
const addPhotoButton = document.querySelector('.add-button')
const photoPopUp = document.querySelector('.popup__photo-container')
const closePopUpButton = document.querySelector('.close-popup');



function popupOpen() {
  popup.classList.add('popup_opened');
  let formName = document.querySelector('.form__item_type_name');
  let formJob = document.querySelector('.form__item_type_job');

  formName.value = profileName.textContent;
  formJob.value = profileCaption.textContent;
}
function popupClose() {
  popup.classList.remove('popup_opened');
}
function formSubmitHandler(evt) {
  evt.preventDefault();
  let formName = document.querySelector('.form__item_type_name');
  let formJob = document.querySelector('.form__item_type_job');

  profileName.textContent = formName.value;
  profileCaption.textContent = formJob.value;

  popupClose();
}
function addPhoto() {
  photoPopUp.classList.add('popup_opened');
}
function closePopUp() {
  photoPopUp.classList.remove('popup_opened');
}


profileButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
submitButton.addEventListener('click', formSubmitHandler);
addPhotoButton.addEventListener('click', addPhoto);
closePopUpButton.addEventListener('click', closePopUp);
