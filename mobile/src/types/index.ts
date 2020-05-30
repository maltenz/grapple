import { GalleryItemType } from '../assets';

export type ModeType = 'day' | 'night';
export type UtilityType = 'edit' | 'delete' | 'view';

export type ColorType =
  | 'black'
  | 'white'
  | 'red'
  | 'purple'
  | 'blue'
  | 'grey'
  | 'grey2'
  | 'grey3'
  | 'grey4'
  | 'transparent';

export interface ProfileType extends GalleryItemType {
  name: string;
  excerpt: string;
}

export type UserType = {
  name: string;
  email: string;
};

export interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  INITIAL_REDUX_STATE: any;
}

declare let window: Window & typeof globalThis;
