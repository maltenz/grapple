import { User } from '../../generated/graphql';

export enum UserActionTypes {
  ADD_USER = '@@user/ADD_USER',
}

export interface UserState {
  readonly user: User;
}
