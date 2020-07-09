/* eslint-disable @typescript-eslint/no-unused-vars */
import { mongoose } from '@typegoose/typegoose';
import { getUsers, getUser, getUserByEmail } from '../controllers/UserController';
import { User } from '../models/UserModel';
import { getPostsByUserLiked, getPostsByUserBookmarked } from '../controllers/PostController';
import { Context } from '../context';

export const UserQuery = {
  users: {
    resolve: async (parent, args, context: Context, info): Promise<User[]> => {
      return getUsers(context);
    },
  },
  user: {
    resolve: async (
      parent,
      args: { id: mongoose.Types.ObjectId },
      context,
      info
    ): Promise<User> => {
      return getUser(context, args.id);
    },
  },
  userLiked: {
    resolve: async (parent, args, context: Context, info): Promise<User> => {
      return getPostsByUserLiked(context);
    },
  },
  userBookmarked: {
    resolve: async (parent, args, context: Context, info): Promise<User> => {
      return getPostsByUserBookmarked(context);
    },
  },
  userByEmail: {
    resolve: async (parent, args, context: Context, info): Promise<User> => {
      return getUserByEmail(context, args.email);
    },
  },
};
