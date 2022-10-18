// import { openPopup } from "../components/modal.js";
// import {
//   elementsTemplate,
//   openedImage,
//   openedImageCaption,
//   imagePopup,
// } from "./constants.js";
// import { api } from "../pages/index.js";

export default class Card {
  constructor(
    data,
    options,
    { handleCardClick, handleLikeClick, handleRemoveClick }
  ) {
    this._id = data.id;
    this._caption = data.name;
    this._imageLink = data.link;
    this._likes = data.likes;
    this._liked = data.liked;
    this._imageAlt = data.alt;
    this._canDelete = data.canDelete;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleRemoveClick = handleRemoveClick;
    this._options = options;
    this._template = this._getTemplateElement(options.template);
    this._element = null;
    this._elementCaption = null;
    this._elementImage = null;
    this._elementLike = null;
    this._elementCount = null;
    this._elementRemove = null;
  }

  _getTemplateElement(cardSelector) {
    return document
      .querySelector(cardSelector)
      .content.querySelector(this._options.classCard);
  }

  getCountLikes() {
    return this._likes;
  }

  isLiked() {
    return this._liked;
  }

  setLike(liked, count) {
    this._likes = count;
    this._liked = liked;
    this._elementLike.classList.toggle(
      this._options.likeButtonActive,
      this._liked
    );
    this._elementCount.textContent = this._likes;
  }

  getId() {
    return this._id;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
    this._elementCaption = null;
    this._elementImage = null;
    this._elementLike = null;
    this._elementCount = null;
    this._elementRemove = null;
  }

  _setEventListeners() {
    this._elementImage.addEventListener("click", () =>
      this._handleCardClick({
        link: this._imageLink,
        alt: this._imageAlt,
        name: this._caption,
      })
    );
    this._elementLike.addEventListener("click", () => this._handleLikeClick());
    if (this._canDelete)
      this._elementRemove.addEventListener("click", () =>
        this._handleRemoveClick()
      );
  }

  createCard() {
    this._element = this._template.cloneNode(true);
    this._elementCaption = this._element.querySelector(this._options.caption);
    this._elementImage = this._element.querySelector(this._options.image);
    this._elementLike = this._element.querySelector(this._options.likeButton);
    this._elementCount = this._element.querySelector(this._options.count);
    this._elementRemove = this._element.querySelector(
      this._options.removeButton
    );
    if (!this._canDelete) {
      this._elementRemove.remove();
      this._elementRemove = null;
    }

    this._elementCaption.textContent = this._caption;
    this._elementImage.src = this._imageLink;
    this._elementImage.alt = this._imageAlt;

    this.setLike(this._liked, this._likes);

    this._setEventListeners();

    return this._element;
  }
}

//функция создания карточки c изображением
// function createCard(data, userId) {
//   const element = elementsTemplate
//     .querySelector(".elements__item")
//     .cloneNode(true);
//   const imageElement = element.querySelector(".elements__img");
//   const imageCaption = element.querySelector(".elements__caption");
//   const likeButton = element.querySelector(".like-button");
//   const deleteButton = element.querySelector(".delete-button");
//   const likesCount = element.querySelector(".like-count");
//   const ownerId = data.owner._id;
//   imageCaption.textContent = data.name;
//   imageElement.src = data.link;
//   imageElement.alt = data.name;
//   findActiveLikes(data, userId, likeButton);
//   likeButton.addEventListener("click", function (evt) {
//     if (evt.target.classList.contains("like-button_active")) {
//       api
//         .deleteLike(data)
//         .then((dataFromServer) => {
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
//     deleteButton.style.visibility = "visible";
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
//   }
//   imageElement.addEventListener("click", () => openImage(data));
//   return element;
// }
// // функция открытия развернутого изображения
// function openImage(data) {
//   openedImage.src = data.link;
//   openedImageCaption.textContent = data.name;
//   openedImage.alt = data.name;
//   openPopup(imagePopup);
// }
// // функция отображения поставленного лайка
// function findActiveLikes(data, userId, likeButton) {
//   data.likes.forEach((like) => {
//     if (like._id === userId) {
//       likeButton.classList.add("like-button_active");
//     }
//   });
// }
