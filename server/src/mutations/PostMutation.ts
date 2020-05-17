import { createPost, deletePost } from '../controllers/PostController';

/**
 * @description holds post mutations
 */

export const PostMutation = {
  createPost: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await createPost(context);
    },
  },
  deletePost: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await deletePost(context, args);
    },
  },
};
