import { getPost, getPosts } from '../controllers/PostController';
import { Post } from '../models/PostModel';

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
    resolve: async (parent, args, context, info): Promise<Post> => {
      return await getPost(context, args.id);
    },
  },
};
