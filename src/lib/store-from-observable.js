import { createStore }  from 'redux';
import { persistStore } from 'redux-persist'


export default function storeFromObservable(reducer, actions){
  const store = createStore(reducer, undefined,
    window.devToolsExtension && window.devToolsExtension());
  persistStore(store);

  actions.onValue(action => store.dispatch(action));

  return store;
};
