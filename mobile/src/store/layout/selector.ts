import { ApplicationState } from '..';
import { Pager, PullVisible } from './types';

const pagerSelector = (state: ApplicationState): Pager => state.layout.pager;
const pullModalVisibleSelector = (state: ApplicationState): PullVisible =>
  state.layout.pullModalVisible;

export { pagerSelector, pullModalVisibleSelector };
