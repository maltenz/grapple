import { action, Action } from 'typesafe-actions';

import { UserActionTypes } from './types';
import { User, Post } from '../../generated/graphql';

export const updateUser = (user: User): Action => action(UserActionTypes.USER_UPDATE, user);

export const updateUserLikes = (id: Pick<Post, 'id'>): Action =>
  action(UserActionTypes.USER_LIKED, id);
