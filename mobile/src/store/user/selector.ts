import { ApplicationState } from '..';
import { UserType } from '../../types';

const userSelector = (state: ApplicationState): UserType => state.user;

export { userSelector };
