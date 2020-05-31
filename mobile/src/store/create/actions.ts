import { action, Action } from 'typesafe-actions';

import { ShotActionTypes } from './types';
import { Shot } from '../../generated/graphql';

export const addShot = (shot: Shot): Action => action(ShotActionTypes.ADD_SHOT, shot);
export const updateShot = (shot: Shot): Action => action(ShotActionTypes.UPDATE_SHOT, shot);
export const deleteShot = ({ id }: Shot): Action => action(ShotActionTypes.DELETE_SHOT, id);
export const clearAllShot = (): Action => action(ShotActionTypes.CLEAR_ALL_SHOT);

export interface MoveShot {
  index: number;
  direction: 'up' | 'down';
}
export const moveShot = ({ index, direction }: MoveShot): Action =>
  action(ShotActionTypes.MOVE_SHOT, { index, direction });
