import { combineReducers } from 'redux';
import { ShotState, shotReducer, createShotsSelector } from './create';
import { addShot, deleteShot, updateShot, moveShot, clearAllShot } from './create/actions';

import {
  UserState,
  userReducer,
  authUserSelector,
  authShotSelector,
  addShot as authAddShot,
  deleteShot as authDeleteShot,
  clearAllShot as authClearAllShot,
} from './user';

import { updateUser } from './user/actions';
import { LayoutState, layoutReducer, layoutPagerSelector, layoutModalSelector } from './layout';
import { updatePager, updateModal } from './layout/actions';

export interface ApplicationState {
  create: ShotState;
  auth: UserState;
  layout: LayoutState;
}

export const createRootReducer = (): unknown =>
  combineReducers({
    create: shotReducer,
    auth: userReducer,
    layout: layoutReducer,
  });

export {
  /**
   * User
   */
  updateUser,
  authUserSelector,
  authShotSelector,
  authAddShot,
  authDeleteShot,
  authClearAllShot,
  /**
   * Layout
   */
  layoutPagerSelector,
  updatePager,
  layoutModalSelector,
  updateModal,
  /**
   * Create
   */
  addShot,
  deleteShot,
  updateShot,
  moveShot,
  clearAllShot,
  createShotsSelector,
};
