import { combineReducers } from 'redux';
import { ShotState, shotReducer, createShotsSelector } from './create';
import { addShot, deleteShot, updateShot, moveShot } from './create/actions';

export interface ApplicationState {
  create: ShotState;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createRootReducer = () =>
  combineReducers({
    create: shotReducer,
  });

export { addShot, deleteShot, updateShot, moveShot, createShotsSelector };
