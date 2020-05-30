import { ApplicationState } from '..';
import { Shot } from '../../generated/graphql';

const createShotsSelector = (state: ApplicationState): Shot[] => state.create.shots;

export { createShotsSelector };
