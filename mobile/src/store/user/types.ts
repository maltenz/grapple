import { User, Shot } from '../../generated/graphql';

export enum UserActionTypes {
  USER_UPDATE = '@@user/USER_UPDATE',
  ADD_SHOT = '@@user/ADD_SHOT',
  UPDATE_SHOT = '@@user/UPDATE_SHOT',
  DELETE_SHOT = '@@user/DELETE_SHOT',
  CLEAR_ALL_SHOT = '@@user/CLEAR_ALL_SHOT',
}

export interface UserState {
  readonly user: User;
  readonly shots: Shot[];
}
