/* eslint-disable @typescript-eslint/no-unused-vars */
import { mongoose } from '@typegoose/typegoose';
import { createComment, updateComment, deleteComment } from '../controllers/CommentController';
import { Comment } from '../models/CommentModel';
import { Context } from '../context';
import { CommentInput } from '../generated/graphql';

export const CommentMutation = {
  createComment: {
    resolve: async (
      parent,
      args: { input: CommentInput },
      context: Context,
      info
    ): Promise<Comment> => {
      return createComment(context, args.input);
    },
  },
  updateComment: {
    resolve: async (
      parent,
      args: { input: CommentInput },
      context: Context,
      info
    ): Promise<Comment> => {
      return updateComment(context, args.input);
    },
  },
  deleteComment: {
    resolve: async (
      parent,
      args: { id: mongoose.Types.ObjectId },
      context: Context,
      info
    ): Promise<Comment> => {
      return deleteComment(context, args);
    },
  },
};
