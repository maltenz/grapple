import { getLike } from '../controllers/LikeController';

/**
 * @description holds like queries
 */

export const LikeQuery = {
  like: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await getLike(context, args.id);
    },
  },
};
