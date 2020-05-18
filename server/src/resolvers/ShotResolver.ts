/* eslint-disable @typescript-eslint/no-unused-vars */
import { IResolvers, ApolloError } from 'apollo-server';
import { ShotQuery } from '../queries/ShotQuery';
import { ShotMutation } from '../mutations/ShotMutation';
import { Context } from '../context';
import { getUser } from '../controllers/UserController';
import { getPost } from '../controllers/PostController';
import { User } from '../models/UserModel';
import { Post } from '../models/PostModel';

/**
 * @description holds shot resolver
 */

export const ShotResolver: IResolvers = {
  Query: ShotQuery,
  Mutation: ShotMutation,
  Shot: {
    user: async (parent, args, context: Context, info): Promise<User> => {
      try {
        return await getUser(context, parent.user);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    post: async (parent, args, context: Context, info): Promise<Post> => {
      try {
        return await getPost(context, parent.post);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
