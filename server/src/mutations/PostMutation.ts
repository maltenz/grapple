import { createPost, deletePost } from '../controllers/PostController';
import { Post } from '../models/PostModel';

/**
 * @description holds post mutations
 */

export const PostMutation = {
  createPost: {
    resolve: async (parent, args, context, info): Promise<Post> => {
      return await createPost(context);
    },
  },
  deletePost: {
    resolve: async (parent, args, context, info): Promise<Post> => {
      return await deletePost(context, args);
    },
  },
};
