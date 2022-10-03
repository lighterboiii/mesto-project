import { closePopup, openPopup } from "../components/modal.js";
import { elementsTemplate, openedImage, openedImageCaption, imagePopup, areUSurePopup } from "./constants.js";
import { setLike, deleteLike, deleteCard, getInitialCards } from '../components/api.js';

//функция создания карточки c изображением
function createCard(data, userId) {
  const element = elementsTemplate.querySelector('.elements__item').cloneNode(true);
  const imageElement = element.querySelector('.elements__img');
  const imageCaption = element.querySelector('.elements__caption');
  const likeButton = element.querySelector('.like-button');
  const deleteButton = element.querySelector('.delete-button');
  const likesCount = element.querySelector('.like-count');
  const ownerId = data.owner._id;
  imageCaption.textContent = data.name;
  imageElement.src = data.link;
  imageElement.alt = data.name;
  findActiveLikes(data, userId, likeButton)
  likeButton.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('like-button_active')) {
      deleteLike(data)
        .then((dataFromServer) => {
          likeButton.classList.remove('like-button_active');
          likesCount.textContent = String(dataFromServer.likes.length);
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      setLike(data)
        .then((dataFromServer) => {
          likeButton.classList.add('like-button_active');
          likesCount.textContent = String(dataFromServer.likes.length);
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })
  likesCount.textContent = String(data.likes.length);
  if (ownerId === userId) {
    deleteButton.style.visibility = 'visible';
    deleteButton.addEventListener('click', function (evt) {
      handleDelete(data)
      evt.target.closest('.elements__item').remove();
    });
  }
  imageElement.addEventListener('click', () => openImage(data));
  return element;
};
// хендлер удаления карточки
function handleDelete(data) {
  deleteCard(data._id)
    .catch((err) => {
      console.log(err);
    });
};
// функция открытия развернутого изображения
function openImage (data) {
  openedImage.src = data.link;
  openedImageCaption.textContent = data.name;
  openedImage.alt = data.name;
  openPopup(imagePopup);
};
// функция отображения поставленного лайка
function findActiveLikes(data, userId, likeButton) {
  data.likes.forEach((like) => {
    if (like._id === userId) {
      likeButton.classList.add("like-button_active");
    }
  });
};

export { createCard }
