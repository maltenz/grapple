import { ShotQuery } from '../queries/ShotQuery';
import { ShotMutation } from '../mutations/ShotMutation';
import { IResolvers } from 'apollo-server';
import { Context } from '../context';
import { getUser } from '../controllers/UserController';
import { getPost } from '../controllers/PostController';

/**
 * @description holds shot resolver
 */

export const ShotResolver: IResolvers = {
  Query: ShotQuery,
  Mutation: ShotMutation,
  Shot: {
    user: async (parent, args, context: Context, info) => {
      try {
        return await getUser(context, parent.user);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    post: async (parent, args, context: Context, info) => {
      try {
        return await getPost(context, parent.post);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
