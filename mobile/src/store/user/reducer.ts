import { Reducer } from 'redux';
import { UsertState, UserActionTypes } from './types';

export const initialState: UsertState = {
  name: '',
  email: '',
};

const reducer: Reducer<UsertState> = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.SET_USER: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as userReducer };
