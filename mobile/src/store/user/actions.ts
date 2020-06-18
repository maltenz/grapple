import { action, Action } from 'typesafe-actions';

import { UserActionTypes } from './types';
import { User, Shot } from '../../generated/graphql';

export const updateUser = (user: User): Action => action(UserActionTypes.USER_UPDATE, user);
export const addShot = (shot: Shot): Action => action(UserActionTypes.ADD_SHOT, shot);
export const deleteShot = ({ id }: Shot): Action => action(UserActionTypes.DELETE_SHOT, id);
export const clearAllShot = (): Action => action(UserActionTypes.CLEAR_ALL_SHOT);
