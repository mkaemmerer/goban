import Bacon from 'baconjs';
import v     from 'v';

import {REHYDRATE} from 'redux-persist/src/constants';


import storeFromObservable from './lib/store-from-observable';
import observableFromStore from './lib/observable-from-store';

import board_view from './goban/board';
import Game       from './data/game';


const placeStone = (game = Game.create(), action) => {
  switch(action.type){
    case 'RESET':
      return Game.create();
    case 'PLACE_STONE':
      return game.placeStone(action.location);
    case REHYDRATE:
      return Game.fromJS(action.payload);
  }
  return game;
};
const locations = Bacon.fromEvent(window.document.body, 'click')
  .filter(e => e.target.classList.contains('goban-grid_space'))
  .map(e => e.target.dataset)
  .map(ds => ({x: parseInt(ds.x), y: parseInt(ds.y)}));
const resets    = Bacon.fromEvent(window.document.body, 'click')
  .filter(e => e.target.classList.contains('reset'));

const actions = Bacon.mergeAll([
    locations
      .map(l => ({type: 'PLACE_STONE', location: l})),
    resets
      .map(() => ({type: 'RESET'}))
  ]);
const store   = storeFromObservable(placeStone, actions);
const board   = observableFromStore(store)
  .map(g => g._board);


const el = v
  .open('main')
    .open('h1')
      .text('Goban')
    .close()
    .append(board_view(board))
    .open('button', {'class': 'reset'})
      .text('reset')
    .close()
  .run();

window.document.body.appendChild(el);
