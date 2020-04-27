import { getAllUsers, getUser } from '../controllers/UserController';

/**
 * @description holds user queries
 */

export const UserQuery = {
  users: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await getAllUsers(context.dbConn);
    },
  },
  user: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await getUser(context.dbConn, args.id);
    },
  },
};
