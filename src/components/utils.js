const initialCards = [
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1552588353-2f2cc7d429e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=778&q=80'
  },
  {
    name: 'Красная Поляна',
    link: 'https://images.unsplash.com/photo-1658170213328-c9d745df2041?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Белгород',
    link: 'https://images.unsplash.com/photo-1658170213798-080be7293ffd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2950&q=80'
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1658208004995-e75ea6e37654?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Рязань',
    link: 'https://images.unsplash.com/photo-1613411278232-e29e3506f4fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1611&q=80'
  },
  {
    name: 'Мценск',
    link: 'https://images.unsplash.com/photo-1658170213269-dc3aa8f27d0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  }
];
function readProfileContent () {
  profileFormNameInput.value = profileName.textContent;
  profileFormCaptionInput.value = profileCaption.textContent;
};
function fillInputContent () {
  profileName.textContent = profileFormNameInput.value;
  profileCaption.textContent = profileFormCaptionInput.value;
};
function resetAddCardForm () {
  addCardForm.reset();
};

const profilePopup = document.querySelector('.popup__profile'); // модальное окно редактирования профиля
const formItemPhotoLink = document.querySelector('.form__item_type_link');
const formItemPhotoCaption = document.querySelector('.form__item_type_photo'); // инпут с подписью к фото
const addPhotoPopup = document.querySelector('.popup__add-photo');
const profileFormNameInput = document.querySelector('.form__item_type_name');
const profileFormCaptionInput = document.querySelector('.form__item_type_job');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const addCardForm = document.querySelector('.card-form'); // форма создания карточки

export { addCardForm, profilePopup, formItemPhotoCaption, formItemPhotoLink, addPhotoPopup, readProfileContent, fillInputContent, initialCards, resetAddCardForm };
