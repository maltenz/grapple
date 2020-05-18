import { getPost, getPosts } from '../controllers/PostController';
import { Post } from '../models/PostModel';
import { getShots } from '../controllers/ShotController';
import ShotModel, { Shot } from '../models/ShotModel';
import { Context } from '../context';

/**
 * @description holds post queries
 */

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
  shots: {
    resolve: async (parent, args, context: Context, info): Promise<Shot[]> => {
      console.log('get shots');
      console.log(parent.post);
      return parent.post.map(async (post) => {
        console.log('post');
        console.log(post);
        return await ShotModel(context.dbConn).find({ postId: post._id });
      });
    },
  },
};
