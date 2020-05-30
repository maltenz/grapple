import { Reducer } from 'redux';
import { LayoutState, LayoutActionTypes } from './types';

export const initialState: LayoutState = {
  theme: 'light',
  pager: {
    activeIndex: 0,
    count: 0,
    visible: false,
  },
  pullModalVisible: false,
};

const reducer: Reducer<LayoutState> = (state = initialState, action) => {
  switch (action.type) {
    case LayoutActionTypes.SET_THEME: {
      return { ...state, theme: action.payload };
    }
    case LayoutActionTypes.UPDATE_PAGER: {
      return { ...state, pager: action.payload };
    }
    case LayoutActionTypes.PULL_MODAL_VISIBLE: {
      return { ...state, pullModalVisible: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as shotReducer };
