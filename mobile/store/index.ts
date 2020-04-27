import { combineReducers } from 'redux';
import { LayoutState, layoutReducer } from './layout';

export interface ApplicationState {
  layout: LayoutState;
}

export const createRootReducer = () =>
  combineReducers({
    layout: layoutReducer,
  });
