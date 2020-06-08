/* eslint-disable @typescript-eslint/no-unused-vars */
import { createComment, updateComment, deleteComment } from '../controllers/CommentController';
import { Comment } from '../models/CommentModel';

/**
 * @description holds comment mutations
 */

export const CommentMutation = {
  createComment: {
    resolve: async (parent, args, context, info): Promise<Comment> => {
      return await createComment(context, args.input);
    },
  },
  updateComment: {
    resolve: async (parent, args, context, info): Promise<Comment> => {
      return await updateComment(context, args.input);
    },
  },
  deleteComment: {
    resolve: async (parent, args, context, info): Promise<Comment> => {
      return await deleteComment(context, args.id);
    },
  },
};
