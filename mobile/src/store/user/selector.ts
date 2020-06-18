import { ApplicationState } from '..';
import { User, Shot } from '../../generated/graphql';

const authUserSelector = (state: ApplicationState): User => state.auth.user;
const authShotSelector = (state: ApplicationState): Shot[] => state.auth.shots;

export { authUserSelector, authShotSelector };
