export default class Section {
  constructor({items, renderer}, selector) {
    this._container = document.querySelector(selector);
    this._items = items;
    this._renderer = renderer;
  }

  addItem(item){
    this._container.prepend(item);
  }

  renderItems(){
    this._items.forEach((item)=>{
      addItem(this._renderer(item));
    });
  }
}