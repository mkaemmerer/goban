import Bacon from 'baconjs';

export default function observableFromStore(store){
  return Bacon.fromBinder(sink =>
      store.subscribe(() =>
        sink(store.getState())
      )
    )
    .toProperty(store.getState());
};
