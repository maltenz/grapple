/* eslint-disable @typescript-eslint/no-unused-vars */
import { Comment } from '../models/CommentModel';
import { getComments } from '../controllers/CommentController';
import { User } from '../models/UserModel';
import { getUser } from '../controllers/UserController';

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
