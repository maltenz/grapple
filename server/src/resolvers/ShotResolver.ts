import { ShotQuery } from '../queries/ShotQuery';
import { ShotMutation } from '../mutations/ShotMutation';
import { IResolvers } from 'apollo-server';
import { Context } from '../context';
import { getPost } from '../controllers/PostController';

/**
 * @description holds shot resolver
 */

export const ShotResolver: IResolvers = {
  Query: ShotQuery,
  Mutation: ShotMutation,
  Shot: {
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
