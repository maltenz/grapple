/* eslint-disable @typescript-eslint/no-unused-vars */
import { IResolvers, ApolloError } from 'apollo-server';
import { CommentQuery } from '../queries/CommentQuery';
import { CommentMutation } from '../mutations/CommentMutation';
import { getUser } from '../controllers/UserController';
import { User } from '../models/UserModel';
import { Context } from '../context';
import { getPost } from '../controllers/PostController';

/**
 * @description holds user comment
 */

export const CommentResolver: IResolvers = {
  Query: CommentQuery,
  Mutation: CommentMutation,
  Comment: {
    user: async (parent, args, context: Context, info): Promise<User> => {
      try {
        return await getUser(context, parent.user);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    post: async (parent, args, context: Context, info): Promise<User> => {
      try {
        return await getPost(context, parent.post);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
};
