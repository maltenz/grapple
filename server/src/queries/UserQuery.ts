import { getUsers, getUser, getUserByEmail } from '../controllers/UserController';
import { User } from '../models/UserModel';

/**
 * @description holds user queries
 */

export const UserQuery = {
  users: {
    resolve: async (parent, args, context, info): Promise<User[]> => {
      return await getUsers(context);
    },
  },
  user: {
    resolve: async (parent, args, context, info): Promise<User> => {
      return await getUser(context, args.id);
    },
  },
  userByEmail: {
    resolve: async (parent, args, context, info): Promise<User> => {
      return await getUserByEmail(context, args.email);
    },
  },
};
