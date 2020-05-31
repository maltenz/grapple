/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createPost,
  deletePost,
  deletePostShot,
  updatePostShot,
  updateWithPositionPostShot,
} from '../controllers/PostController';
import { Post } from '../models/PostModel';

/**
 * @description holds post mutations
 */

export const PostMutation = {
  createPost: {
    resolve: async (parent, args, context, info): Promise<Post> => {
      return await createPost(context, args);
    },
  },
  deletePost: {
    resolve: async (parent, args, context, info): Promise<Post> => {
      return await deletePost(context, args);
    },
  },
  deletePostShot: {
    resolve: async (parent, args, context, info): Promise<Post> => {
      const { id, shotId } = args.input;
      return await deletePostShot(context, { id, shotId });
    },
  },
  updatePostShot: {
    resolve: async (parent, args, context, info): Promise<Post> => {
      const { id, shotId, title, content, image } = args.input;
      return await updatePostShot(context, { id, shotId, title, content, image });
    },
  },
  updateWithPositionPostShot: {
    resolve: async (parent, args, context, info): Promise<Post> => {
      const { id, shotId, position, title, content, image } = args.input;

      return await updateWithPositionPostShot(context, {
        id,
        shotId,
        position,
        title,
        content,
        image,
      });
    },
  },
};
