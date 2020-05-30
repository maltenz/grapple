import { combineReducers } from 'redux';
import { ShotState, shotReducer } from './create';
import { addShot, deleteShot, updateShot } from './create/actions';

export interface ApplicationState {
  create: ShotState;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createRootReducer = () =>
  combineReducers({
    create: shotReducer,
  });

export { addShot, deleteShot, updateShot };
