import { getAllPosts } from '../controllers/PostController';

/**
 * @description holds post queries
 */

export const PostQuery = {
  posts: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await getAllPosts(context);
    },
  },
};
