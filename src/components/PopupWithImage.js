import { Popup } from '../components/Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.photo-card__image');
    this._popupCaption = this._popup.querySelector('.photo-card__caption');
  }

  open(data) {
    this._popupImage.src = data.link;
    this._popupImage.alt = `${data.name}`;
    this._popupCaption.textContent = data.name;
    super.open();
  }
};
