/* eslint-disable @typescript-eslint/no-unused-vars */
import { mongoose } from '@typegoose/typegoose';

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

import { Context } from '../context';

import {
  CreatePost,
  ShotDeleteInput,
  ShotUpdateInput,
  ShotUpdatePositionInput,
} from '../generated/graphql';

export const PostMutation = {
  createPost: {
    resolve: async (parent, args: { input: CreatePost }, context: Context, info): Promise<Post> => {
      return createPost(context, args);
    },
  },
  deletePost: {
    resolve: async (
      parent,
      args: { id: mongoose.Types.ObjectId },
      context: Context,
      info
    ): Promise<Post> => {
      return deletePost(context, args);
    },
  },
  deletePostShot: {
    resolve: async (
      parent,
      args: { input: ShotDeleteInput },
      context: Context,
      info
    ): Promise<Post> => {
      const { id, shotId } = args.input;
      return deletePostShot(context, { id, shotId });
    },
  },
  updatePostShot: {
    resolve: async (
      parent,
      args: { input: ShotUpdateInput },
      context: Context,
      info
    ): Promise<Post> => {
      const { id, shotId, title, content, image } = args.input;
      return updatePostShot(context, { id, shotId, title, content, image });
    },
  },
  updateWithPositionPostShot: {
    resolve: async (
      parent,
      args: { input: ShotUpdatePositionInput },
      context: Context,
      info
    ): Promise<Post> => {
      const { id, shotId, position, title, content, image } = args.input;

      return updateWithPositionPostShot(context, {
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
    resolve: async (
      parent,
      args: { id: mongoose.Types.ObjectId },
      context: Context,
      info
    ): Promise<Post | null> => {
      const { id } = args;
      return likePost(context, id);
    },
  },
  unlikePost: {
    resolve: async (
      parent,
      args: { id: mongoose.Types.ObjectId },
      context: Context,
      info
    ): Promise<Post> => {
      const { id } = args;
      return unlikePost(context, id);
    },
  },
  bookmarkPost: {
    resolve: async (
      parent,
      args: { id: mongoose.Types.ObjectId },
      context: Context,
      info
    ): Promise<Post | null> => {
      const { id } = args;
      return bookmarkPost(context, id);
    },
  },
  removeBookmarkPost: {
    resolve: async (
      parent,
      args: { id: mongoose.Types.ObjectId },
      context: Context,
      info
    ): Promise<Post> => {
      const { id } = args;
      return removeBookmarkPost(context, id);
    },
  },
};
