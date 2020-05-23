/* eslint-disable @typescript-eslint/no-unused-vars */
import { IResolvers, ApolloError } from 'apollo-server';
import { PostQuery } from '../queries/PostQuery';
import { PostMutation } from '../mutations/PostMutation';
import { Context } from '../context';
import { getUser } from '../controllers/UserController';
import { User } from '../models/UserModel';

/**
 * @description holds post resolver
 */

export const PostResolver: IResolvers = {
  Query: PostQuery,
  Mutation: PostMutation,
  Post: {
    user: async (parent, args, context: Context, info): Promise<User> => {
      try {
        return await getUser(context, parent.user);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
};
