import { combineReducers } from 'redux';
import { LayoutState, layoutReducer } from './layout';

import * as layoutActions from './layout/actions';
import * as layoutSelectors from './layout/selector';

export interface ApplicationState {
  layout: LayoutState;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createRootReducer = () =>
  combineReducers({
    layout: layoutReducer,
  });

export { layoutActions, layoutSelectors };
