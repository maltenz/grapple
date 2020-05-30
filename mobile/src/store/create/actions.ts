import { action, Action } from 'typesafe-actions';

import { ShotActionTypes } from './types';
import { Shot } from '../../generated/graphql';

export const addShot = (shot: Shot): Action => action(ShotActionTypes.ADD_SHOT, shot);
export const updateShot = (shot: Shot): Action => action(ShotActionTypes.UPDATE_SHOT, shot);
export const deleteShot = ({ id }: Shot): Action => action(ShotActionTypes.DELETE_SHOT, id);
