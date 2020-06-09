/* eslint-disable @typescript-eslint/no-unused-vars */
import { getUsers, getUser, getUserByEmail } from '../controllers/UserController';
import { User } from '../models/UserModel';
import {
  getPostsByUserLiked,
  getPostsByUserId,
  getPostsByUserBookmarked,
} from '../controllers/PostController';
import { Context } from '../context';
import { Post } from '../models/PostModel';

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
    resolve: async (parent, args, context: Context, info): Promise<Post[]> => {
      return await getPostsByUserId(context, { id: context.user?._id });
    },
  },
  userLiked: {
    resolve: async (parent, args, context, info): Promise<User> => {
      return await getPostsByUserLiked(context);
    },
  },
  userBookmarked: {
    resolve: async (parent, args, context, info): Promise<User> => {
      return await getPostsByUserBookmarked(context);
    },
  },
  userByEmail: {
    resolve: async (parent, args, context, info): Promise<User> => {
      return await getUserByEmail(context, args.email);
    },
  },
};
