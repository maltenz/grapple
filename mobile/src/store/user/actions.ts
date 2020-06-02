import { action, Action } from 'typesafe-actions';

import { UserActionTypes } from './types';
import { User } from '../../generated/graphql';

export const updateUser = (user: User): Action => action(UserActionTypes.ADD_USER, user);
