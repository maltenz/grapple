import { Reducer } from 'redux';
import { UserState, UserActionTypes } from './types';
import { User } from '../../generated/graphql';

export const initialState: UserState = {
  user: {
    name: '',
    email: '',
    password: '',
  },
  liked: [],
};

const reducer: Reducer<UserState> = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.USER_UPDATE: {
      const payload = action.payload as User;
      return { ...state, user: payload };
    }

    default: {
      return state;
    }
  }
};

export { reducer as userReducer };
