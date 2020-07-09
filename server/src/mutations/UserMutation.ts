/* eslint-disable @typescript-eslint/no-unused-vars */
import { createUser, deleteUser, loginUser } from '../controllers/UserController';
import { User } from '../generated/graphql';

export const UserMutation = {
  loginUser: {
    resolve: async (parent, args, context, info): Promise<User> => {
      return loginUser(context, args.input);
    },
  },
  createUser: {
    resolve: async (parent, args, context, info): Promise<User> => {
      return createUser(context, args.input);
    },
  },
  deleteUser: {
    resolve: async (parent, args, context, info): Promise<User> => {
      return deleteUser(context, args.input);
    },
  },
};
