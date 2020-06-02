import { Pager, Modal } from '../../generated/graphql';

export enum LayoutActionTypes {
  UPDATE_PAGER = '@@pager/UPDATE_PAGER',
  UPDATE_MODAL = '@@modal/UPDATE_MODAL',
}

export interface LayoutState {
  readonly pager: Pager;
  readonly modal: Modal;
}
