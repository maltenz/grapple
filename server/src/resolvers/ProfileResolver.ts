/* eslint-disable @typescript-eslint/no-unused-vars */
import { IResolvers, ApolloError } from 'apollo-server';
import { ProfileQuery } from '../queries/ProfileQuery';
import { ProfileMutation } from '../mutations/ProfileMutation';
import { getUser } from '../controllers/UserController';
import { User } from '../models/UserModel';
import { Context } from '../context';
import { getPost } from '../controllers/PostController';

export const CommentResolver: IResolvers = {
  Query: ProfileQuery,
  Mutation: ProfileMutation,
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
