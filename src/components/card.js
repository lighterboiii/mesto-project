export default class Card {
  constructor(
    data,
    userID,
    { handleClickImage, handleDeleteClick, handleLikeClick },
    cardTemplate
  ) {
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

  _addHandlerLike() {
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
    });
  }

  setStateLike() {
    this._like.classList.toggle("like-button_active");
  }

  setCountLikeToPage(likes) {
    this._likes = likes;
    this._card.querySelector(".like-count").textContent = likes.length;
  }

  setEventListeners() {
    this._like.addEventListener("click", () => {
      this._addHandlerLike();
    });
    this._btnRemove.addEventListener("click", () => {
      this._addHandlerBtnRemove();
    });
    this._image.addEventListener("click", () => {
      this._handleClickImage();
    });
  }

  createCard() {
    this._getTemplate();

    this._like = this._card.querySelector(".like-button");
    this._image = this._card.querySelector(".elements__img");
    this._elementTitle = this._card.querySelector(".elements__caption");
    this._elementLikes = this._card.querySelector(".like-count");
    this._btnRemove = this._card.querySelector(".delete-button");

    this._image.src = this._link;
    this._image.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._elementLikes.textContent = this._likesCount;

    if (this._ownerId === this._userID) {
      this._btnRemove.style.visibility = "visible";
    }

    if (this.haveLikeOwner()) {
      this.setStateLike();
    }

    this.setEventListeners();

    return this._card;
  }
}
