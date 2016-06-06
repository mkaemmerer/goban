import { createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist'


// export default function storeFromObservable(reducer, actions){
//   const store = createStore(reducer, undefined, autoRehydrate());
//   persistStore(store);
//
//   actions.onValue(action => store.dispatch(action));
//
//   return store;
// };

export default function storeFromObservable(reducer, actions){
  const store = createStore(reducer);
  // persistStore(store);

  actions.onValue(action => store.dispatch(action));

  return store;
};
