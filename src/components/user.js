import { profileAvatar } from '../components/modal.js';
import { profileFormNameInput, profileFormCaptionInput } from '../components/utils.js';

function getUserInfo() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-15/users/me ', {
    headers: {
      authorization: '79a19db7-3f97-4425-9bfc-faae1f13f72c'
    }
  })
  .then(res => res.json())
  .then((result) => {
    profileFormNameInput.textContent = result.name;
    profileFormCaptionInput.textContent = result.about;
    profileAvatar.src = result.avatar;
  })
}

export { getUserInfo };
