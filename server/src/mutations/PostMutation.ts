import { createPost, deletePost } from '../controllers/PostController';
import { createShot } from '../controllers/ShotController';

/**
 * @description holds post mutations
 */

export const PostMutation = {
  createPost: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await createPost(context, args.input);
    },
  },
  deletePost: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await deletePost(context, args.id);
    },
  },
  createShot: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await createShot(context, args.id);
    },
  },
};
