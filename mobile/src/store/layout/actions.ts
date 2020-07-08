import { action, Action } from 'typesafe-actions';

import { LayoutActionTypes } from './types';
import { Pager, Modal } from '../../generated/graphql';

export const updatePager = (pager: Pager): Action => action(LayoutActionTypes.UPDATE_PAGER, pager);
export const updateModal = (modal: Modal): Action => action(LayoutActionTypes.UPDATE_MODAL, modal);
