/* eslint-disable @typescript-eslint/no-unused-vars */
import { Comment } from '../models/CommentModel';
import { getComments } from '../controllers/CommentController';

/**
 * @description holds comment queries
 */

export const CommentQuery = {
  comments: {
    resolve: async (parent, args, context, info): Promise<Comment[]> => {
      return await getComments(context, args);
    },
  },
};
