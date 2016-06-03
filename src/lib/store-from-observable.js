import { createStore } from 'redux';

export default function storeFromObservable(reducer, actions){
  const store = createStore(reducer);

  actions.onValue(action => store.dispatch(action));

  return store;
};
