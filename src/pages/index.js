import '../pages/index.css';

import { enableValidation, config } from '../components/validate.js';
import {Card, makeNewCard} from '../components/card.js';
import Section from '../components/Section.js';
import { openProfile, closePopup, openCardPopup, openAvatarPopup, toggleButtonText, openPopup } from '../components/modal.js';
import { Api } from '../components/Api.js';
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
  imagePopup
} from '../components/constants.js';

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: '79a19db7-3f97-4425-9bfc-faae1f13f72c',
    'Content-Type': 'application/json'
  }
});

// func that get promises from Api for user info and rendered cards
const profile = {
  data: {},
  nameNode: document.querySelector(".profile__name"),
  avatarNode: document.querySelector(".profile__avatar-container"),
  avatarImageNode: document.querySelector(".avatar"),
  employmentNode: document.querySelector(".profile__caption"),
  editButtonNode: document.querySelector(".profile__button"),
  newItemButtonNode: document.querySelector(".add-button"),
};

let userId;

api.getAllData()
  .then(([userData, cards]) => {
    userId = userData._id;
    profileAvatar.src = userData.avatar;
    setInfo(userData.name, userData.about);
    initCards();
  })
  .catch((err) => {
    console.log(err);
  });

  function initCards() {
    api.getInitialCards().then((cards) => {
      cards.forEach((card) => {
        const cardElement = makeNewCard(
          card,
          profile.data._id,
          handleImageClick,
          handleLikeClick,
          handleDeleteElement,
        );
        elementsList.append(cardElement);
      });
    }).catch(err=>{
      console.error(`Ошибка. ${err}`)
    });
  }


  function handleImageClick(event) {
    const currentElement = event.target.closest(".elements__item");
    if (currentElement != null) {
      const currentElementImage = currentElement.querySelector(".elements__img");
      const imageSrc = currentElementImage.src;
      const imageAlt = currentElementImage.alt;
      const elementTitle =
        currentElement.querySelector(".elements__caption").textContent;
        openedImage.src = imageSrc;
        openedImage.alt = imageAlt;
        openedImageCaption.textContent = elementTitle;
    }
    openPopup(imagePopup);
  }

  function handleLikeClick(event) {
    const currentCard = event.target.closest(".elements__item");
    if (event.target.classList.contains("like-button_active")) {
      api.deleteLike(currentCard.dataset.cardId)
        .then((card) => {
          currentCard.querySelector(".like-count").textContent =
            card.likes.length;
          toggleLike(event);
        })
        .catch((err) => {
          console.error(`Не удалось убрать лайк. ${err}`);
        });
    } else {
      api.setLike(currentCard.dataset.cardId)
        .then((card) => {
          currentCard.querySelector(".like-count").textContent =
            card.likes.length;
          toggleLike(event);
        })
        .catch((err) => {
          console.error(`Не удалось поставить лайк. ${err}`);
        });
    }
  }
  

  function toggleLike(event) {
    event.target.classList.toggle("like-button_active");
  }

  function handleDeleteElement(event) {
    const cardElement = event.target.closest(".elements__item");
    deleteCard(cardElement.dataset.cardId)
      .then(() => {
        event.target.closest(".elements__item").remove();
      })
      .catch((err) => {
        console.error(`Не удалось удалить карточку. ${err}`);
      });
  }
// function calls
enableValidation(config);

// // функция рендера карточки первой в список
// function renderCard(card, container) {
//   container.prepend(card);
// };
// // функция для рендера карточек с сервера от старых к новым
// function renderServerCard(card, container) {
//   container.append(card);
// };
// функция рендера на сабмит формы добавления карточки
function renderOnSubmit(res) {
  const card = makeNewCard(res, userId);
};
function submitCardForm(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  toggleButtonText(true, submitButton, 'Создать')
  api.postCard(formItemPhotoCaption.value, formItemPhotoLink.value)
    .then((res) => {
      renderOnSubmit(res)
      closePopup(addPhotoPopup);
      addCardForm.reset();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      toggleButtonText(false, submitButton, 'Создать')
    })
};
// функция обновления user info
function submitProfileForm(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  toggleButtonText(true, submitButton, 'Сохранить')
  api.setUserInfo(profileFormNameInput.value, profileFormCaptionInput.value)
    .then(() => {
      setInfo(profileFormNameInput.value, profileFormCaptionInput.value)
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      toggleButtonText(false, submitButton, 'Сохранить')
    })
};
// функция обновления аватара
function submitAvatar(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  toggleButtonText(true, submitButton, 'Сохранить')
  api.setAvatar(avatarInput.value)
    .then((res) => {
      profileAvatar.src = res.avatar
      closePopup(avatarEditPopup);
      avatarEditForm.reset();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      toggleButtonText(false, submitButton, 'Сохранить')
    })

};
// get info from inputs
function getInfo(name, about) {
  profileFormNameInput.value = name;
  profileFormCaptionInput.value = about;
};
// set info to textContent values
function setInfo(name, about) {
  profileName.textContent = name;
  profileCaption.textContent = about;
};

//event listeners
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('form__close-button')) {
          closePopup(popup)
        }
    })
});
openProfilePopupButton.addEventListener('click', openProfile); // открыть форму редактирования профиля
profilePopup.addEventListener('submit', submitProfileForm); // сабмит окна редактирования профиля
addPhotoButton.addEventListener('click', openCardPopup); // открытие формы добавления карточки на страницу
addCardForm.addEventListener('submit', submitCardForm); // отправка формы добавления карточки на страницу
profileAvatarButton.addEventListener('click', openAvatarPopup); // открыть попап редактирования аватара
avatarEditPopup.addEventListener('submit', submitAvatar); // сохранение аватарки

export { getInfo, setInfo };


