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
  // user: {
  //   resolve: async (parent, args, context, info): Promise<User> => {
  //     console.log('args');
  //     console.log(args);
  //     console.log('parent');
  //     console.log(parent);
  //     return await getUser(context, args.id);
  //   },
  // },
};
