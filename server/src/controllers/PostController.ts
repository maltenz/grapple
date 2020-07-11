import { ApolloError } from 'apollo-server';
import { mongoose } from '@typegoose/typegoose';
import PostModel, { Post } from '../models/PostModel';
import { Context } from '../context';
import loginRequired from '../helper/loginRequired';

import {
  CreatePost,
  ShotDeleteInput,
  ShotUpdateInput,
  ShotUpdatePositionInput,
} from '../generated/graphql';

export const createPost = async (
  { dbConn, loggedIn, user }: Context,
  args: { input: CreatePost }
): Promise<Post> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);
  const { shots } = args.input;

  let post;

  try {
    post = (await PostModel(dbConn).create({
      user,
      shots,
      likes: [],
      bookmarks: [],
    })) as Post;

    if (post === null) {
      ERR_MESSAGE = 'Unable to save post';
      throw new Error(ERR_MESSAGE);
    }

    return post;
  } catch (error) {
    throw new ApolloError(error);
  }
};

export const getPost = async ({ dbConn, loggedIn }, id: mongoose.Types.ObjectId): Promise<Post> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);

  try {
    const post = (await PostModel(dbConn).findById(id)) as Post;

    if (post === null) {
      ERR_MESSAGE = 'Unable find post';
      throw new ApolloError(ERR_MESSAGE);
    }

    return post;
  } catch (error) {
    throw new ApolloError(error);
  }
};

/**
 * @param context
 * @returns {Post}
 */
export const getPostsByUserId = async ({ dbConn, loggedIn }: Context, args): Promise<Post[]> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);
  const { id } = args;
  let list;

  try {
    list = (await PostModel(dbConn).find({ user: id })) as Post;

    if (list === null) {
      ERR_MESSAGE = 'Unable find posts';
      throw new ApolloError(ERR_MESSAGE);
    }
  } catch (error) {
    throw new ApolloError(error);
  }
  return list;
};

export const getPostsByUserLiked = async ({ dbConn, loggedIn, user }: Context): Promise<Post> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);

  try {
    const post = (await PostModel(dbConn).find({ likes: user?._id })) as Post;

    if (post === null) {
      ERR_MESSAGE = 'No liked posts';
      throw new ApolloError(ERR_MESSAGE);
    }

    return post;
  } catch (error) {
    throw new ApolloError(error);
  }
};

export const getPosts = async ({ dbConn, loggedIn }: Context): Promise<Post[]> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);

  try {
    const post = (await PostModel(dbConn).find().sort({ _id: -1 })) as Post[];

    if (!post.length) {
      ERR_MESSAGE = 'No posts found';
      throw new ApolloError(ERR_MESSAGE);
    }

    return post;
  } catch (error) {
    throw new ApolloError(error);
  }
};

/**
 * @param context
 * @param {id}
 * @returns {Post}
 */
export const deletePost = async (
  context: Context,
  { id }: { id: mongoose.Types.ObjectId }
): Promise<Post> => {
  const { dbConn, loggedIn } = context;
  const ERR_MESSAGE = 'Unable to delete post';
  loginRequired(loggedIn);

  let post;

  try {
    post = await PostModel(dbConn).findByIdAndRemove(id);
  } catch (error) {
    throw new ApolloError(ERR_MESSAGE);
  }

  return post;
};

export const deletePostShot = async (
  context: Context,
  { id, shotId }: ShotDeleteInput
): Promise<Post> => {
  const { dbConn, loggedIn } = context;
  let ERR_MESSAGE = 'Unable to delete shot';
  loginRequired(loggedIn);

  try {
    const post = (await PostModel(dbConn).findByIdAndUpdate(id, {
      $pull: {
        shots: { _id: shotId },
      },
    })) as Post;

    if (post === null) {
      ERR_MESSAGE = 'Unable find post';
      throw new ApolloError(ERR_MESSAGE);
    }

    return post;
  } catch (error) {
    throw new ApolloError(ERR_MESSAGE);
  }
};

export const updatePostShot = async (
  context: Context,
  { id, shotId, title, content, image }: ShotUpdateInput
): Promise<Post> => {
  const { dbConn, loggedIn } = context;
  let ERR_MESSAGE = 'Unable to update shot';
  loginRequired(loggedIn);

  try {
    const post = (await PostModel(dbConn).findByIdAndUpdate(
      id,
      {
        $set: {
          shots: { shotId, title, content, image },
        },
      },
      { new: true }
    )) as Post;

    if (post === null) {
      ERR_MESSAGE = 'Unable find post';
      throw new ApolloError(ERR_MESSAGE);
    }

    return post;
  } catch (error) {
    throw new ApolloError(ERR_MESSAGE);
  }
};

export const updateWithPositionPostShot = async (
  context: Context,
  args: ShotUpdatePositionInput
): Promise<Post> => {
  const { id, shotId, position, title, content, image } = args;
  const { dbConn, loggedIn } = context;
  let ERR_MESSAGE = 'Unable to update shot';
  loginRequired(loggedIn);

  try {
    const post = (await PostModel(dbConn).findByIdAndUpdate(
      id,
      {
        $push: {
          shots: {
            $each: [{ _id: shotId, title, content, image }],
            $position: position,
          },
        },
      },
      { new: true }
    )) as Post;

    if (post === null) {
      ERR_MESSAGE = 'Unable find post';
      throw new ApolloError(ERR_MESSAGE);
    }

    return post;
  } catch (error) {
    throw new ApolloError(ERR_MESSAGE);
  }
};

export const likePost = async (
  context: Context,
  id: mongoose.Types.ObjectId
): Promise<Post | null> => {
  const { dbConn, loggedIn, user } = context;
  const ERR_MESSAGE = 'Unable to like post';
  loginRequired(loggedIn);

  let post;

  try {
    const hasLiked = (await PostModel(dbConn).findOne({
      _id: id,
      likes: user?._id,
    })) as Post;

    if (hasLiked) {
      return null;
    }

    post = await PostModel(dbConn).findOneAndUpdate(
      { _id: id },
      {
        $push: {
          likes: user?._id,
        },
      }
    );
  } catch (error) {
    throw new ApolloError(ERR_MESSAGE);
  }

  return post;
};

export const unlikePost = async (context: Context, id: mongoose.Types.ObjectId): Promise<Post> => {
  const { dbConn, loggedIn, user } = context;
  const ERR_MESSAGE = 'Unable to unlike post';
  loginRequired(loggedIn);

  let post;

  try {
    post = await PostModel(dbConn).findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          likes: user?._id,
        },
      }
    );
  } catch (error) {
    throw new ApolloError(ERR_MESSAGE);
  }

  return post;
};

export const getPostsByUserBookmarked = async ({
  dbConn,
  loggedIn,
  user,
}: Context): Promise<Post> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);

  try {
    const post = (await PostModel(dbConn).find({
      bookmarks: user?._id,
    })) as Post;

    if (post === null) {
      ERR_MESSAGE = 'No bookmarked posts';
      throw new ApolloError(ERR_MESSAGE);
    }

    return post;
  } catch (error) {
    throw new ApolloError(error);
  }
};

export const bookmarkPost = async (
  context: Context,
  id: mongoose.Types.ObjectId
): Promise<Post | null> => {
  const { dbConn, loggedIn, user } = context;
  const ERR_MESSAGE = 'Unable to bookmark post';
  loginRequired(loggedIn);

  let post;

  try {
    const hasBookmarked = (await PostModel(dbConn).findOne({
      _id: id,
      bookmarks: user?._id,
    })) as Post;

    if (hasBookmarked) {
      return null;
    }

    post = await PostModel(dbConn).findOneAndUpdate(
      { _id: id },
      {
        $push: {
          bookmarks: user?._id,
        },
      }
    );
  } catch (error) {
    throw new ApolloError(ERR_MESSAGE);
  }

  return post;
};

export const removeBookmarkPost = async (
  context: Context,
  id: mongoose.Types.ObjectId
): Promise<Post> => {
  const { dbConn, loggedIn, user } = context;
  const ERR_MESSAGE = 'Unable to remove bookmark on post';
  loginRequired(loggedIn);

  let post;

  try {
    post = await PostModel(dbConn).findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          bookmarks: user?._id,
        },
      }
    );
  } catch (error) {
    throw new ApolloError(ERR_MESSAGE);
  }

  return post;
};
