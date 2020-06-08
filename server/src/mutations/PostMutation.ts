/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createPost,
  deletePost,
  deletePostShot,
  updatePostShot,
  updateWithPositionPostShot,
  likePost,
  unlikePost,
  bookmarkPost,
  removeBookmarkPost,
} from '../controllers/PostController';
import { Post } from '../models/PostModel';

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
  likePost: {
    resolve: async (parent, args, context, info): Promise<Post | null> => {
      const { id } = args;
      return await likePost(context, id);
    },
  },
  unlikePost: {
    resolve: async (parent, args, context, info): Promise<Post> => {
      const { id } = args;
      return await unlikePost(context, id);
    },
  },
  bookmarkPost: {
    resolve: async (parent, args, context, info): Promise<Post | null> => {
      const { id } = args;
      return await bookmarkPost(context, id);
    },
  },
  removeBookmarkPost: {
    resolve: async (parent, args, context, info): Promise<Post> => {
      const { id } = args;
      return await removeBookmarkPost(context, id);
    },
  },
};
