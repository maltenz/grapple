import { PostQuery } from '../queries/PostQuery';
import { PostMutation } from '../mutations/PostMutation';
import { IResolvers } from 'apollo-server';
import { Context } from '../context';
import { getUser } from '../controllers/UserController';
import { getShots } from '../controllers/ShotController';

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
    shots: async (parent, args, context: Context, info) => {
      try {
        return await getShots(context, parent._id);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
