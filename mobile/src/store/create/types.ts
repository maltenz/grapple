import { Shot } from '../../generated/graphql';

export enum ShotActionTypes {
  ADD_SHOT = '@@shot/ADD_SHOT',
  UPDATE_SHOT = '@@shot/UPDATE_SHOT',
  DELETE_SHOT = '@@shot/UPDATE_SHOT',
  MOVE_SHOT = '@@shot/MOVE_SHOT',
}

export interface ShotState {
  readonly shots: Shot[];
}
