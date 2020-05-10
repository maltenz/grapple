import { combineReducers } from 'redux';
import { LayoutState, layoutReducer } from './layout';
import { UsertState, userReducer } from './user';

import * as layoutActions from './layout/actions';
import * as layoutSelectors from './layout/selector';
import * as userActions from './user/actions';
import * as userSelectors from './user/selector';

export interface ApplicationState {
  layout: LayoutState;
  user: UsertState;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createRootReducer = () =>
  combineReducers({
    layout: layoutReducer,
    user: userReducer,
  });

export { layoutActions, layoutSelectors, userActions, userSelectors };
