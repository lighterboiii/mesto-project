import { openPopup } from "./modal.js";
import { renderInitialCards, postCard } from '../components/api.js';


renderInitialCards();
//функция создания карточки c изображением
function createCard(data) {
  postCard(data);
  const element = elementsTemplate.querySelector('.elements__item').cloneNode(true);
  const imageElement = element.querySelector('.elements__img');
  const likeButton = element.querySelector('.like-button');
  const deleteButton = element.querySelector('.delete-button');
  element.querySelector('.elements__caption').textContent = data.name;
  imageElement.src = data.link;
  imageElement.alt = data.name;
  deleteButton.addEventListener('click', function () {
    const elementItem = deleteButton.closest('.elements__item');
    elementItem.remove();
  });
  likeButton.addEventListener('mousedown', function () {
    likeButton.classList.toggle('like-button_active'); // функция лайка созданной карточки
  });
  function openImage(evt) {
    openedImage.src = evt.target.getAttribute('src');
    openedImageCaption.textContent = evt.target.getAttribute('alt');
    openedImage.alt = evt.target.getAttribute('alt');
    openPopup(imagePopup);
  };
  imageElement.addEventListener('click', openImage);
  return element;
};

const openedImage = document.querySelector('.photo-card__image'); // фото полноразмерное
const openedImageCaption = document.querySelector('.photo-card__caption'); // описание полноращмерного фото
const elementsList = document.querySelector('.elements');
const imagePopup = document.querySelector('.photo-card'); // открытое фото
const elementsTemplate = document.querySelector('#elements__template').content;


export { createCard, imagePopup, elementsList, openedImage };
