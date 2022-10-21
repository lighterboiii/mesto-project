import {api} from '../pages/index'

export default class Card {
  constructor(data, userID, { handleClickImage, handleDeleteClick, handleLikeClick }, cardTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._likesCount = data.likes.length;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._cardTemplate = cardTemplate;
    this._userID = userID;

    this._handleClickImage = handleClickImage;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    this._card = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".elements__item")
      .cloneNode(true);
  }

  getCardInfo() {
    const name = this._name;
    const link = this._link;
    return { name, link };
  }

  _addHandlerLike(like) {
    this._handleLikeClick();    
  }

  _addHandlerBtnRemove() {
    this._handleDeleteClick();
  }
  
  deleteCardToPage() {
    this._card.remove();
    this._card = null;
  }

  haveLikeOwner() {
    return this._likes.some((like) => {
      return like._id === this._userID;
    })
  }

  setStateLike() {
    this._card
        .querySelector(".like-button")
        .classList
        .toggle("like-button_active");
  }

  setCountLikeToPage(likes) {
    this._likes = likes; 
    this._card.querySelector(".like-count").textContent = likes.length;
  }

  _setEventListeners() {
    const like = this._card.querySelector(".like-button");
    const image = this._card.querySelector(".elements__img");

    like.addEventListener("click", () => {
      this._addHandlerLike(like);
    });
    this._btnRemove.addEventListener("click", () => {
      this._addHandlerBtnRemove();
    });
    image.addEventListener("click", () => {
      this._handleClickImage();
    });
  }


  createCard() {
    this._getTemplate();

    const elementImage = this._card.querySelector(".elements__img");
    const elementTitle = this._card.querySelector(".elements__caption");
    const elementLikes = this._card.querySelector(".like-count");
    this._btnRemove = this._card.querySelector(".delete-button");

    elementImage.src = this._link;
    elementImage.alt = this._name;
    elementTitle.textContent = this._name;
    elementLikes.textContent = this._likesCount;

    if (this._ownerId === this._userID) {
      this._btnRemove.style.visibility = 'visible';
      
    }

    if (this.haveLikeOwner() ) {
      this.setStateLike();
    }

    this._setEventListeners();

    return this._card;
  }
}

