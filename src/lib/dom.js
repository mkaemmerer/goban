import Bacon from 'baconjs';

class DOM {
  constructor(root, selectors){
    this._root      = root;
    this._selectors = selectors;
  }
  select(selector){
    return new DOM(this._root, this._selectors.concat(selector));
  }
  events(event_name){
    const selector = this._selectors.join(' ');

    return Bacon.fromEvent(this._root, event_name)
      .filter(e => e.target.matches(selector));
  }
}

export default function makeDOM(root){
  return new DOM(root, []);
};
