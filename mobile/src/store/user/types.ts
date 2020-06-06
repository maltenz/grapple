import { User } from '../../generated/graphql';

export enum UserActionTypes {
  USER_UPDATE = '@@user/USER_UPDATE',
  USER_LIKED = '@@user/USER_LIKED',
}

export interface UserState {
  readonly user: User;
  readonly liked: string[];
}
