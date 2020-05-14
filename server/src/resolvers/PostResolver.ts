import { PostQuery } from '../queries/PostQuery';
import { PostMutation } from '../mutations/PostMutation';
import { IResolvers } from 'apollo-server';
import UserModel from '../models/UserModel';
import { Context } from '../context';
import { getUser } from '../controllers/UserController';

/**
 * @description holds post resolver
 */

export const PostResolver: IResolvers = {
  Query: PostQuery,
  Mutation: PostMutation,
  Post: {
    user: async (parent, args, context: Context, info) => {
      try {
        return await getUser(context, parent.user);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
