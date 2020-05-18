import { createUser, deleteUser, loginUser } from '../controllers/UserController';
import { User } from '../models/UserModel';

/**
 * @description holds user mutations
 */

export const UserMutation = {
  loginUser: {
    resolve: async (parent, args, context, info): Promise<{}> => {
      return await loginUser(context, args.input);
    },
  },
  createUser: {
    resolve: async (parent, args, context, info): Promise<User> => {
      return await createUser(context, args.input);
    },
  },
  deleteUser: {
    resolve: async (parent, args, context, info): Promise<User> => {
      return await deleteUser(context, args.input);
    },
  },
};
