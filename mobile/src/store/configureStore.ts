import { Store, createStore, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import { persistStore, persistReducer, Persistor } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

import { ApplicationState, createRootReducer } from '.';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: ['user'],
};

export default function configureStore(
  initialState: ApplicationState
): { store: Store<ApplicationState>; persistor: Persistor } {
  const composeEnhancers = composeWithDevTools({});
  const persistedReducer = persistReducer(persistConfig, createRootReducer());

  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );

  const persistor = persistStore(store);

  return { store, persistor };
}
