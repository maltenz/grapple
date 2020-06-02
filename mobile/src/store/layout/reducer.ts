import { Reducer } from 'redux';
import { LayoutState, LayoutActionTypes } from './types';
import { Pager, Modal } from '../../generated/graphql';

export const initialState: LayoutState = {
  pager: {
    activeIndex: 0,
    count: 0,
    visible: false,
  },
  modal: {
    visible: false,
  },
};

const reducer: Reducer<LayoutState> = (state = initialState, action) => {
  switch (action.type) {
    case LayoutActionTypes.UPDATE_PAGER: {
      const payload = action.payload as Pager;
      return { ...state, pager: payload };
    }
    case LayoutActionTypes.UPDATE_MODAL: {
      const payload = action.payload as Modal;
      return { ...state, modal: payload };
    }

    default: {
      return state;
    }
  }
};

export { reducer as layoutReducer };
