/* eslint-disable @typescript-eslint/no-unused-vars */
import { getPost, getPosts } from '../controllers/PostController';
import { Post } from '../models/PostModel';
import { Context } from '../context';

export const PostQuery = {
  posts: {
    resolve: async (parent, args, context, info): Promise<Post[]> => {
      return await getPosts(context);
    },
  },
  post: {
    resolve: async (parent, args, context, info): Promise<Post> => {
      return await getPost(context, args.id);
    },
  },
};
