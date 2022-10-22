import { elementsTemplate, openedImage, openedImageCaption, imagePopup } from "./constants.js";
import { api } from "../pages/index.js";

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
      api.deleteLike(data)
        .then((dataFromServer) => {
          likeButton.classList.remove('like-button_active');
          likesCount.textContent = String(dataFromServer.likes.length);
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      api.setLike(data)
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
    deleteButton.addEventListener("click", function (evt) {
      api.deleteCard(data._id)
        .then(() => {
          evt.target.closest(".elements__item").remove();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  imageElement.addEventListener('click', () => openImage(data));
  return element;
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
