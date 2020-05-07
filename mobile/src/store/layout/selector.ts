import { ApplicationState } from '..';
import { Pager } from './types';

const pagerSelector = (state: ApplicationState): Pager => state.layout.pager;

export { pagerSelector };
