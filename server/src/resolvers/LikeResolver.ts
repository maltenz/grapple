import { LikeQuery } from '../queries/LikeQuery';
import { LikeMutation } from '../mutations/LikeMutation';
import { IResolvers } from 'apollo-server';
import { Context } from '../context';
import { getPost } from '../controllers/PostController';

/**
 * @description holds like resolver
 */

export const LikeResolver: IResolvers = {
  Query: LikeQuery,
  Mutation: LikeMutation,
  Like: {
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
