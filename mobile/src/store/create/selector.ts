import { ApplicationState } from '..';
import { Shot } from '../../generated/graphql';

const shotSelector = (state: ApplicationState): Shot[] => state.create.shots;

export { shotSelector };
