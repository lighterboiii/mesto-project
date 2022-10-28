import "../pages/index.css";

import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Api } from '../components/Api.js';
import { FormValidation, config } from "../components/FormValidation.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "79a19db7-3f97-4425-9bfc-faae1f13f72c",
    "Content-Type": "application/json",
  },
});

const elementsSelector = '.elements';
api
  .getAllData()
  .then((values) => {
    const [userData, cards] = values;
    userInfo.setUserInfo(userData);
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

const cardsList = new Section(
  {
    renderer: (card) => {
      addCardToPage(card);
    },
  },
  elementsSelector
);

function handleDeleteClick(card) {
  api
    .deleteCard(card._id)
    .then(() => {
      card.deleteCardToPage();
    })
    .catch((err) => {
      console.log(err);
    });
};

const elementsTemplateSelector = '#elements__template';
function addCardToPage(dataCard) {
  const card = new Card(
    dataCard,
    userInfo.id,
    {
      handleClickImage: () => {
        const cardInfo = card.getCardInfo();
        imagePopup.setEventListeners();
        imagePopup.open(cardInfo);
      },
      handleDeleteClick: () => handleDeleteClick(card),
      handleLikeClick: () => {
        if (card.haveLikeOwner()) {
          api
            .deleteLike(card)
            .then((data) => {
              card.setCountLikeToPage(data.likes);
              card.setStateLike();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .setLike(card)
            .then((data) => {
              card.setCountLikeToPage(data.likes);
              card.setStateLike();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    },
    elementsTemplateSelector
  );
  const cardNode = card.createCard();
  cardsList.addItem(cardNode);
};

const profileNameSelector = '.profile__name';
const profileCaptionSelector = '.profile__caption';
const profileAvatarSelector = '.profile__avatar';
const userInfo = new UserInfo(
  profileNameSelector,
  profileCaptionSelector,
  profileAvatarSelector
);

const popupPhotoSelector = '.photo-card';
const imagePopup = new PopupWithImage(popupPhotoSelector);

const popupWithAddCardSelector = '.popup__add-photo';
const popupWithAddCardForm = new PopupWithForm(popupWithAddCardSelector, {
  submit: (data) => {
    popupWithAddCardForm.toggleButtonText(true);
    api.postCard(data)
      .then((res) => {
        addCardToPage(res);
        popupWithAddCardForm.close()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithAddCardForm.toggleButtonText(false);
      })
  }
});

const popupWithProfileSelector = '.popup__profile';
const popupWithProfileInfo = new PopupWithForm(popupWithProfileSelector, {
  submit: (data) => {
    popupWithProfileInfo.toggleButtonText(true);
    api.setUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupWithProfileInfo.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithProfileInfo.toggleButtonText(false);
      })
  }
});

const popupAvatarSelector = '.popup__avatar';
const popupWithAvatarForm = new PopupWithForm(popupAvatarSelector, {
  submit: (data) => {
    popupWithAvatarForm.toggleButtonText(true);
    api.setAvatar(data)
      .then((res) => {
        userInfo.setAvatar(res);
        popupWithAvatarForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithAvatarForm.toggleButtonText(false);
      })
  }
});
// constants
const addCardForm = document.querySelector('.card-form');
const avatarForm = document.querySelector('.avatar-form');
const profileForm = document.querySelector('.profile-form');
const profileFormCaptionInput = document.querySelector('.form__item_type_job');
const profileFormNameInput = document.querySelector('.form__item_type_name');
const openProfilePopupButton = document.querySelector('.profile__button'); // кнопка открытия модального окна редактирования профиля
const profileAvatarButton = document.querySelector('.profile__avatar-button'); // кнопка октрытия попапа аватарки
const openAddPhotoPopupButton = document.querySelector('.add-button')  // кнопка открытия окна добавления карточки
// formvalidation
const addCardFormValidation = new FormValidation(addCardForm, config);
addCardFormValidation.enableValidation();
const changeAvatarFormValidation = new FormValidation(avatarForm, config);
changeAvatarFormValidation.enableValidation();
const profileFormValidation = new FormValidation(profileForm, config);
profileFormValidation.enableValidation();
// eventlisteners
openProfilePopupButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  profileFormNameInput.value = userData.name;
  profileFormCaptionInput.value = userData.about;
  popupWithProfileInfo.open();
});
openAddPhotoPopupButton.addEventListener('click', () => {
  addCardFormValidation.disableSubmitButton();
  popupWithAddCardForm.open()
});
profileAvatarButton.addEventListener('click', () => {
  changeAvatarFormValidation.disableSubmitButton();
  popupWithAvatarForm.open();
});
