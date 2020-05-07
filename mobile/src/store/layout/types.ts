export type ThemeColors = 'light' | 'dark';
export type Pager = {
  activeIndex: number;
  count: number;
  visible: boolean;
};

export enum LayoutActionTypes {
  SET_THEME = '@@layout/SET_THEME',
  UPDATE_PAGER = '@@layout/UPDATE_PAGER',
}

export interface LayoutState {
  readonly theme: ThemeColors;
  readonly pager: Pager;
}
