import { createUser, deleteUser, updateUser } from '../controllers/UserController';

/**
 * @description holds user mutations
 */

export const UserMutation = {
  createUser: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await createUser(context, args.input);
    },
  },
  updateUser: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await updateUser(context, args.input);
    },
  },
  deleteUser: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await deleteUser(context, args.id);
    },
  },
};
