/* eslint-disable @typescript-eslint/no-unused-vars */
import { Comment } from '../models/CommentModel';
import { getComments } from '../controllers/CommentController';
import { Context } from '../context';

export const CommentQuery = {
  comments: {
    resolve: async (parent, args, context: Context, info): Promise<Comment[]> => {
      return getComments(context, args);
    },
  },
};
