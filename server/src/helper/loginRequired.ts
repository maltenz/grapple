import { ApolloError } from 'apollo-server';

const loginRequired = (loggedIn: boolean) => {
  if (loggedIn === false) {
    throw new ApolloError('Oops, please you must login to continue');
  }
};

export default loginRequired;
