import { combineReducers } from 'redux';
import { LayoutState, layoutReducer } from './layout';

import * as storeTheme from './layout';

export interface ApplicationState {
  layout: LayoutState;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createRootReducer = () =>
  combineReducers({
    layout: layoutReducer,
  });

export { storeTheme };
