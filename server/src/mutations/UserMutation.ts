import { createUser, deleteUser, loginUser } from '../controllers/UserController';

/**
 * @description holds user mutations
 */

export const UserMutation = {
  loginUser: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await loginUser(context, args.input);
    },
  },
  createUser: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await createUser(context, args.input);
    },
  },
  deleteUser: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await deleteUser(context, args.input);
    },
  },
};
