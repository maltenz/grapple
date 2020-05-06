import { action, Action } from 'typesafe-actions';

import { LayoutActionTypes, ThemeColors } from './types';

export const setTheme = (theme: ThemeColors): Action => action(LayoutActionTypes.SET_THEME, theme);
