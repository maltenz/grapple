/* eslint-disable @typescript-eslint/no-unused-vars */
import { getUsers, getUser, getUserByEmail } from '../controllers/UserController';
import { User } from '../models/UserModel';
import { getPostsByUserLiked, getPostsByUserId } from '../controllers/PostController';

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
  userPosts: {
    resolve: async (parent, args, context, info): Promise<User> => {
      return await getPostsByUserId(context);
    },
  },
  userLiked: {
    resolve: async (parent, args, context, info): Promise<User> => {
      return await getPostsByUserLiked(context);
    },
  },
  userByEmail: {
    resolve: async (parent, args, context, info): Promise<User> => {
      return await getUserByEmail(context, args.email);
    },
  },
};
