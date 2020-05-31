import { Shot } from '../../generated/graphql';

export enum ShotActionTypes {
  ADD_SHOT = '@@shot/ADD_SHOT',
  UPDATE_SHOT = '@@shot/UPDATE_SHOT',
  DELETE_SHOT = '@@shot/DELETE_SHOT',
  MOVE_SHOT = '@@shot/MOVE_SHOT',
  CLEAR_ALL_SHOT = '@@shot/CLEAR_ALL_SHOT',
}

export interface ShotState {
  readonly shots: Shot[];
}
