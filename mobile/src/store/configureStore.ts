import { Store, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

import { ApplicationState, createRootReducer } from '.';

export default function configureStore(initialState: ApplicationState): Store<ApplicationState> {
  const composeEnhancers = composeWithDevTools({});

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
}
