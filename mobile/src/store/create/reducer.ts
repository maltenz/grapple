import { Reducer } from 'redux';
import { ShotState, ShotActionTypes } from './types';
import { Shot } from '../../generated/graphql';

export const initialState: ShotState = {
  shots: [],
};

const reducer: Reducer<ShotState> = (state = initialState, action) => {
  switch (action.type) {
    case ShotActionTypes.ADD_SHOT: {
      const payload = action.payload as Shot;
      const shotAdded = [...state.shots];

      shotAdded.push(payload);

      return { ...state, shots: shotAdded };
    }
    case ShotActionTypes.DELETE_SHOT: {
      const payload = ((action.payload as Pick<Shot, 'id'>) as unknown) as string;
      const shotDeleted = [...state.shots];

      shotDeleted.forEach((shot: Shot, index: number) => {
        if (shot.id === payload) {
          shotDeleted.splice(index, 1);
        }
      });

      return { ...state, shots: shotDeleted };
    }
    case ShotActionTypes.UPDATE_SHOT: {
      const payload = action.payload as Shot;
      const shots = [...state.shots];

      shots.forEach((shot: Shot, index: number): void => {
        if (shot.id === payload.id) {
          shots[index] = {
            id: shot.id,
            title: payload.title || shot.title,
            content: payload.content || shot.content,
            image: payload.image || shot.image,
          };
        }
      });
      return { ...state, shots };
    }
    default: {
      return state;
    }
  }
};

export { reducer as shotReducer };
