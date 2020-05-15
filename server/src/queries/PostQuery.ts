import { getPosts, getPost } from '../controllers/PostController';

/**
 * @description holds post queries
 */

export const PostQuery = {
  posts: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await getPosts(context);
    },
  },
  post: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await getPost(context, args.id);
    },
  },
};
