import { action, Action } from 'typesafe-actions';

import { LayoutActionTypes, ThemeColors, Pager } from './types';

export const setTheme = (theme: ThemeColors): Action => action(LayoutActionTypes.SET_THEME, theme);

export const updatePager = (pager: Pager): Action => action(LayoutActionTypes.UPDATE_PAGER, pager);
