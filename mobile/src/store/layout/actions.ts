import { action, Action } from 'typesafe-actions';

import { LayoutActionTypes, ThemeColors, Pager, PullVisible } from './types';

export const setTheme = (theme: ThemeColors): Action => action(LayoutActionTypes.SET_THEME, theme);

export const updatePager = (pager: Pager): Action => action(LayoutActionTypes.UPDATE_PAGER, pager);

export const setPullModalVisibilty = (visible: PullVisible): Action =>
  action(LayoutActionTypes.PULL_MODAL_VISIBLE, visible);
