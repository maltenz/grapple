import { action, Action } from 'typesafe-actions';

import { Modal } from 'react-native';
import { LayoutActionTypes } from './types';
import { Pager } from '../../generated/graphql';

export const updatePager = (pager: Pager): Action => action(LayoutActionTypes.UPDATE_PAGER, pager);
export const updateModal = (modal: Modal): Action => action(LayoutActionTypes.UPDATE_MODAL, modal);
