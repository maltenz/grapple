import { createPost } from '../controllers/PostController';

/**
 * @description holds post mutations
 */

export const PostMutation = {
  createPost: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await createPost(context, args.input);
    },
  },
};
