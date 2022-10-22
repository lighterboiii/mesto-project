import "../pages/index.css";

import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Api } from '../components/Api.js';
import { FormValidation, config } from "../components/FormValidation.js";
import Card from "../components/card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/userInfo.js";
import {
  openProfile,
  closePopup,
  openCardPopup,
  openAvatarPopup,
  toggleButtonText,
  openPopup,
} from "../components/modal.js";
import { Api } from "../components/api.js";
import {
  profileAvatar,
  profileName,
  profileCaption,
  addCardForm,
  avatarEditForm,
  avatarEditPopup,
  avatarInput,
  profileAvatarButton,
  addPhotoButton,
  openProfilePopupButton,
  elementsList,
  profilePopup,
  addPhotoPopup,
  profileFormNameInput,
  profileFormCaptionInput,
  formItemPhotoCaption,
  formItemPhotoLink,
  popups,
  openedImage,
  openedImageCaption,
  imagePopup,
} from "../components/constants.js";
// import { data } from "autoprefixer";

export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "79a19db7-3f97-4425-9bfc-faae1f13f72c",
    "Content-Type": "application/json",
  },
});
// эксземпляр класса FormValidation
const setFormValidation = (formElement) => {
  const formValidation = new FormValidation(formElement, config);
  formValidation.enableValidation();
}
const formList = Array.from(document.querySelectorAll('.form'));
formList.forEach(form => {
  setFormValidation(form);
})
// функция получения данных профиля и карточек с сервера
let userId;

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__caption",
  ".profile__avatar-container"
);

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
// popups
const popupPhotoSelector = '.photo-card';
const imagePopup = new PopupWithImage(popupPhotoSelector); // после пулреквеста связать с рендером карточки

const popupWithAddCardSelector = '.popup__add-photo';
const popupWithAddCardForm = new PopupWithForm(popupWithAddCardSelector, {
  submit: (data) => {
    popupWithAddCardForm.toggleButtonText(true);
    api.postCard(data)
      .then((res) => {
        const card = createCard(res);
        const cardElement = card.createCard();
        cardsList.addItem(cardElement, 'prepend');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithAddCardForm.toggleButtonText(false);
        popupWithAddCardForm.close()
      })
  }
});

const cardsList = new Section(
  {
    renderer: (card) => {
      addCardToPage(card);
    },
  },
  ".elements"
);
function handleDeleteClick(card) {
  api
    .deleteCard(card._id)
    .then(() => {
      card.deleteCardToPage();
    })
    .catch((err) => {
      console.log(`${err}`);
    });
}

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
              setErrorServer(err);
            });
        } else {
          api
            .setLike(card)
            .then((data) => {
              card.setCountLikeToPage(data.likes);
              card.setStateLike();
            })
            .catch((err) => {
              setErrorServer(err);
            });
        }
      },
    },
    "#elements__template"
  );
  const cardNode = card.createCard();
  cardsList.addItem(cardNode);
};

// функция рендера карточки первой в список
function renderCard(card, container) {
  container.append(card);
};
// функция рендера на сабмит формы добавления карточки
function renderOnSubmit(data) {
  const card = addCardToPage(data);
  renderCard(card, elementsList);
};
// function submitCardForm(evt) {
//   evt.preventDefault();
//   const submitButton = evt.submitter;
//   toggleButtonText(true, submitButton, 'Создать')
//   api.postCard(formItemPhotoCaption.value, formItemPhotoLink.value)
//     .then((res) => {
//       renderOnSubmit(res)
//       closePopup(addPhotoPopup);
//       addCardForm.reset();
//     })
//     .catch((err) => {
//       console.log(err)
//     })
//     .finally(() => {
//       toggleButtonText(false, submitButton, 'Создать')
//     })
// };

// функция обновления user info
function submitProfileForm(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  toggleButtonText(true, submitButton, "Сохранить");
  api
    .setUserInfo(profileFormNameInput.value, profileFormCaptionInput.value)
    .then(() => {
      setInfo(profileFormNameInput.value, profileFormCaptionInput.value);
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      toggleButtonText(false, submitButton, "Сохранить");
    });
}
// функция обновления аватара
function submitAvatar(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  toggleButtonText(true, submitButton, "Сохранить");
  api
    .setAvatar(avatarInput.value)
    .then((info) => {
      userInfo.setUserInfo(info);
      closePopup(avatarEditPopup);
      avatarEditForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      toggleButtonText(false, submitButton, "Сохранить");
    });
};
// get info from inputs
function getInfo(name, about) {
  profileFormNameInput.value = name;
  profileFormCaptionInput.value = about;
}
// set info to textContent values
function setInfo(name, about) {
  profileName.textContent = name;
  profileCaption.textContent = about;
}

// //event listeners
// popups.forEach((popup) => {
//     popup.addEventListener('mousedown', (evt) => {
//         if (evt.target.classList.contains('popup_opened')) {
//             closePopup(popup)
//         }
//         if (evt.target.classList.contains('form__close-button')) {
//           closePopup(popup)
//         }
//     })
// });
openProfilePopupButton.addEventListener('click', openProfile); // открыть форму редактирования профиля
profilePopup.addEventListener('submit', submitProfileForm); // сабмит окна редактирования профиля
addPhotoButton.addEventListener('click', () => {
  popupWithAddCardForm.open()
}); // открытие формы добавления карточки на страницу
// addCardForm.addEventListener('submit', submitCardForm); // отправка формы добавления карточки на страницу
profileAvatarButton.addEventListener('click', openAvatarPopup); // открыть попап редактирования аватара
avatarEditPopup.addEventListener('submit', submitAvatar); // сохранение аватарки

export { getInfo, setInfo };
