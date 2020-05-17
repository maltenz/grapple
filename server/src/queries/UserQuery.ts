import { getUsers, getUser, getUserByEmail } from '../controllers/UserController';

/**
 * @description holds user queries
 */

export const UserQuery = {
  users: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await getUsers(context);
    },
  },
  user: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await getUser(context, args.id);
    },
  },
  userByEmail: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await getUserByEmail(context, args.email);
    },
  },
};
