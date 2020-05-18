/* eslint-disable @typescript-eslint/no-unused-vars */
import { IResolvers, ApolloError } from 'apollo-server';
import { PostQuery } from '../queries/PostQuery';
import { PostMutation } from '../mutations/PostMutation';
import { Context } from '../context';
import { getUser } from '../controllers/UserController';
import { getShots } from '../controllers/ShotController';
import { User } from '../models/UserModel';
import { Shot } from '../models/ShotModel';

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
    shots: async (parent, args, context: Context, info): Promise<Shot[]> => {
      try {
        return await getShots(context, parent);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
};
