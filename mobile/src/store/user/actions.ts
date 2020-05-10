import { action, Action } from 'typesafe-actions';

import { UserActionTypes } from './types';
import { UserType } from '../../types';

export const setUser = (user: UserType): Action => action(UserActionTypes.SET_USER, user);
