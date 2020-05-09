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
