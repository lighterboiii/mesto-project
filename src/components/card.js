import { closePopup } from "./modal.js";
import { addPhotoPopup, formItemPhotoLink, formItemPhotoCaption } from "./utils.js";

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
//функция создания карточки c изображением
function createCard(data) {
  const elementsTemplate = document.querySelector('#elements__template').content;
  const element = elementsTemplate.querySelector('.elements__item').cloneNode(true);
  element.querySelector('.elements__caption').textContent = data.name;
  element.querySelector('.elements__img').src = data.link;
  element.querySelector('.elements__img').alt = data.name;
  const deleteButton = element.querySelector('.delete-button'); // удаление созданной карточки
  deleteButton.addEventListener('click', function () {
    const elementItem = deleteButton.closest('.elements__item');
    elementItem.remove();
  });
  const likeButton = element.querySelector('.like-button');
  likeButton.addEventListener('mousedown', function () {
    likeButton.classList.toggle('like-button_active'); // функция лайка созданной карточки
  });
  function openImage(evt) {
    openedImage.src = evt.target.getAttribute('src');
    openedImageCaption.textContent = evt.target.getAttribute('alt');
    imagePopup.classList.add('photo-card_opened');
  };
  function closeImage() {
    imagePopup.classList.remove('photo-card_opened'); // закрытие развернутого изображения
  }
  addEventListener('keydown', function (evt) { // закрытие развернутого изображения на Esc
    if (evt.key === 'Escape') { 
      closeImage();
    }
  })
  const image = element.querySelector('.elements__img');
  image.addEventListener('click', openImage);
  closePhotoButton.addEventListener('click', closeImage);
  return element;
};
// отрисовка карточки в контейнере
function renderCard(card, container) {
  container.prepend(card);
};
// сабмит формы добавления карточки
function submitCardForm(evt) {
  evt.preventDefault();
  const data = {
    name: document.querySelector('.form__item_type_photo').value,
    link: document.querySelector('.form__item_type_link').value
  };
  const card = createCard(data);
  renderCard(card, elementsList);
  closePopup(addPhotoPopup);
  formItemPhotoLink.value = '';
  formItemPhotoCaption.value = '';
};
// отрисовка карточек из массива
function renderFromArray (array) {
array.forEach(function (item) {
  const card = createCard(item);
  renderCard(card, elementsList);
});
}
const openedImage = document.querySelector('.photo-card__image'); // фото полноразмерное
const openedImageCaption = document.querySelector('.photo-card__caption'); // описание полноращмерного фото
const elementsList = document.querySelector('.elements');
const imagePopup = document.querySelector('.photo-card'); // открытое фото
const closePhotoButton = document.querySelector('.photo__close-button'); // кнопка закрытия биг имейджа

export {createCard, renderCard, initialCards, submitCardForm, renderFromArray };
