import { createLike, deleteLike } from '../controllers/LikeController';

/**
 * @description holds like mutations
 */

export const LikeMutation = {
  createLike: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await createLike(context, args.input);
    },
  },
  deleteLike: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await deleteLike(context, args.id);
    },
  },
};
