/* eslint-disable @typescript-eslint/no-unused-vars */
import { getPost, getPosts } from '../controllers/PostController';
import { Post } from '../models/PostModel';
import { Context } from '../context';

export const PostQuery = {
  posts: {
    resolve: async (parent, args, context: Context, info): Promise<Post[]> => {
      return getPosts(context);
    },
  },
  post: {
    resolve: async (parent, args, context: Context, info): Promise<Post> => {
      return getPost(context, args.id);
    },
  },
};
