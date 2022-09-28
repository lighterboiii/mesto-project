import { openPopup } from "./modal.js";
import { elementsTemplate, openedImage, openedImageCaption, imagePopup } from "./utils.js";
import { setLike, deleteLike, deleteCard } from '../components/api.js';

//функция создания карточки c изображением
function createCard(data, userId) {
  const element = elementsTemplate.querySelector('.elements__item').cloneNode(true);
  const imageElement = element.querySelector('.elements__img');
  const likeButton = element.querySelector('.like-button');
  const deleteButton = element.querySelector('.delete-button');
  const likesCount = element.querySelector('.like-count');
  const ownerId = data.owner._id;
  element.querySelector('.elements__caption').textContent = data.name;
  imageElement.src = data.link;
  imageElement.alt = data.name;
  likeButton.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('like-button_active')) {
      likeButton.classList.remove('like-button_active');
      deleteLike(data)
        .then((dataFromServer) => {
          likesCount.textContent = String(dataFromServer.likes.length);
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      likeButton.classList.add('like-button_active');
      setLike(data)
        .then((dataFromServer) => {
          likesCount.textContent = String(dataFromServer.likes.length);
        })
        .catch((err) => {
          console.log(err)
        })
    }
  });
  likesCount.textContent = String(data.likes.length);
  if (ownerId === userId) {
    deleteButton.style.visibility = 'visible';
    deleteButton.addEventListener('click', function (evt) {
      deleteHandler(data);
      evt.target.closest('.elements__item').remove();
    });
  }
  imageElement.addEventListener('click', openImage);
  return element;
};
// хендлер удаления карточки
function deleteHandler(data) {
  console.log(data._id)
  deleteCard(data)
    .catch((err) => {
      console.log(err);
    });
};
// функция открытия развернутого изображения
function openImage(evt) {
  openedImage.src = evt.target.getAttribute('src');
  openedImageCaption.textContent = evt.target.getAttribute('alt');
  openedImage.alt = evt.target.getAttribute('alt');
  openPopup(imagePopup);
};


// const openedImage = document.querySelector('.photo-card__image'); // фото полноразмерное
// const openedImageCaption = document.querySelector('.photo-card__caption'); // описание полноращмерного фото
// const elementsList = document.querySelector('.elements');
// const imagePopup = document.querySelector('.photo-card'); // открытое фото
// const elementsTemplate = document.querySelector('#elements__template').content;


export { createCard }
