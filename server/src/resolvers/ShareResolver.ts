import { ShareQuery } from '../queries/ShareQuery';
import { ShareMutation } from '../mutations/ShareMutation';
import { IResolvers } from 'apollo-server';
import { Context } from '../context';
import { getPost } from '../controllers/PostController';

/**
 * @description holds share resolver
 */

export const ShareResolver: IResolvers = {
  Query: ShareQuery,
  Mutation: ShareMutation,
  Share: {
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
