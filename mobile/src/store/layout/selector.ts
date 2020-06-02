import { ApplicationState } from '..';
import { Pager, Modal } from '../../generated/graphql';

const layoutPagerSelector = (state: ApplicationState): Pager => state.layout.pager;
const layoutModalSelector = (state: ApplicationState): Modal => state.layout.modal;

export { layoutPagerSelector, layoutModalSelector };
