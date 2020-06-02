import { ApplicationState } from '..';
import { User } from '../../generated/graphql';

const authUserSelector = (state: ApplicationState): User => state.auth.user;

export { authUserSelector };
