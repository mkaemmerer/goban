// import { createStore }  from 'redux';
import { createStore, compose } from 'redux';
import { persistStore } from 'redux-persist'


export default function storeFromObservable(reducer, actions){
  const store = createStore(reducer, undefined,
    compose(
      f => f,
      window.devToolsExtension()
    ));
  persistStore(store);

  actions.onValue(action => store.dispatch(action));

  return store;
};
