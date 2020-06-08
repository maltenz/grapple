/* eslint-disable @typescript-eslint/no-unused-vars */
import { Comment } from '../models/CommentModel';
import { getCommemts } from '../controllers/CommentController';

/**
 * @description holds comment queries
 */

export const CommentQuery = {
  comments: {
    resolve: async (parent, args, context, info): Promise<Comment[]> => {
      return await getCommemts(context, args.id);
    },
  },
};
