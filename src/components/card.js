// import { openPopup } from "../components/modal.js";

import { api } from "../pages/index.js";

const cardTemplate = document.querySelector("#elements__template").content;

export default class Card {
  constructor(
    { _id, name, likes, link, owner },
    selector,
    handleLike,
    handleUnlike,
    handleCardClick,
    handleDeleteCard,
    profileId
  ) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._owner = owner;
    this._selector = selector;

    this._profileId = profileId;

    this._handleLike = handleLike(_id);
    this._handleUnlike = handleUnlike(_id);
    this._handleCardClick = handleCardClick(name, link);
    this._handleDeleteCard = handleDeleteCard(_id);
  }

  _createElement() {
    this._card = document
      .querySelector("#elements__template")
      .content.querySelector(this._selector)
      .cloneNode(true);
  }

  generatorElement() {
    const element = this._createElement();

    const imageCaption = element.querySelector(".elements__caption");
    imageCaption.textContent = this._name;

    const imageElement = element.querySelector(".elements__img");
    imageElement.src = this._link;
    imageElement.alt = this._name;

    const likeContainer = element.querySelector(".like-container");

    const likesCount = element.querySelector(".like-count");
    likesCount.textContent = this._likes.length;

    const like = likeContainer.querySelector(".like-button");
    if (this._likes.some((like) => like.owner._id === this._profileId))
      like.classList.add("like-button_active");

    const deleteButton = element.querySelector(".delete-button");
    if (this._owner._id !== this._profileId)
      deleteButton.style.visibility = "hidden";

    this._setEventListeners(image, like, deleteButton);

    return element;
  }
  _setEventListeners(image, like, deleteButton) {
    image.setEventListeners("click", () => {
      this._handleCardClick();
    });

    like.setEventListeners("click", () => {
      like.classList.contains("like-button_active")
        ? this._handleUnlike()
        : this._handleLike();
    });

    deleteButton.setEventListeners("click", () => {
      this._handleDeleteCard();
    });
  }
}

export const makeNewCard = (
  card,
  profileId,
  imageClickCallback,
  likeClickCallback,
  deleteClickCallback
) => {
  
  const cardElement = cardTemplate
    .querySelector(".elements__item")
    .cloneNode(true);
  cardElement.dataset.cardId = card._id;
  const elementImage = cardElement.querySelector(".elements__img");
  elementImage.src = card.link;
  elementImage.alt = card.name;
  elementImage.addEventListener("click", imageClickCallback);

  cardElement.querySelector(".elements__caption").textContent = card.name;
  cardElement.querySelector(".like-count").textContent = card.likes.length;

  const deleteButton = cardElement.querySelector(".delete-button");
  const likeButton = cardElement.querySelector(".like-button");
  likeButton.addEventListener("click", likeClickCallback);
  const liked = card.likes.some((like) => {
    return like._id === profileId;
  });
  if (liked) likeButton.classList.add("like-button_active");
  if (card.owner._id !== profileId) deleteButton.style.visibility = "hidden";
  else deleteButton.addEventListener("click", deleteClickCallback);
  return cardElement;
};

// function toggleLike(event) {
//   event.target.classList.toggle("like-button_active");
// }
//  function handleLikeClick(data, userId) {
//   const element = cardTemplate
//     .querySelector(".elements__item")
//     .cloneNode(true);
//   const likeButton = element.querySelector(".like-button");
//   const deleteButton = element.querySelector(".delete-button");
//   const likesCount = element.querySelector(".like-count");
//   findActiveLikes(data, userId, likeButton);
//   likeButton.addEventListener("click", function (evt) {
//     if (evt.target.classList.contains("like-button_active")) {
//       api
//         .deleteLike(data)
//         .then((dataFromServer) => {
//           toggleLike(itemLike);
//           likeButton.classList.remove("like-button_active");
//           likesCount.textContent = String(dataFromServer.likes.length);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       api
//         .setLike(data)
//         .then((dataFromServer) => {
//           toggleLike(itemLike);
//           likeButton.classList.add("like-button_active");
//           likesCount.textContent = String(dataFromServer.likes.length);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   });
//   likesCount.textContent = String(data.likes.length);
//   if (ownerId === userId) {
//     deleteButton.addEventListener("click", function (evt) {
//       api
//         .deleteCard(data._id)
//         .then(() => {
//           evt.target.closest(".elements__item").remove();
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     });
//   } else {
//     deleteButton.style.visibility = "hidden";
//   }
//   return element;
// };
// // функция отображения поставленного лайка
// function findActiveLikes(data, userId, likeButton) {
//   data.likes.forEach((like) => {
//     if (like._id === userId) {
//       likeButton.classList.add("like-button_active");
//     }
//   });
// }
