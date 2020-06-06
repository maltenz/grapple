import PostModel, { Post } from '../models/PostModel';
import { ApolloError } from 'apollo-server';
import { Context } from '../context';
import loginRequired from '../helper/loginRequired';
import UserModel, { User } from '../models/UserModel';

/**
 * @param context
 * @returns {Post}
 */
export const createPost = async ({ dbConn, loggedIn, user }: Context, args): Promise<Post> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);
  const { shots } = args.input;

  let post;

  try {
    post = (await PostModel(dbConn).create({
      user,
      shots,
      likes: [],
    })) as Post;

    if (post === null) {
      ERR_MESSAGE = 'Unable to save post';
      throw new Error(ERR_MESSAGE);
    }

    (await UserModel(dbConn).findByIdAndUpdate(user?._id, {
      $push: {
        posts: post._id,
      },
    })) as User;

    return post;
  } catch (error) {
    throw new ApolloError(error);
  }
};

/**
 * @param context
 * @param id
 * @returns {Post}
 */
export const getPost = async ({ dbConn, loggedIn, user }, id: string): Promise<Post> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);

  try {
    const post = (await PostModel(dbConn).findById(id)) as Post;

    if (post === null) {
      ERR_MESSAGE = 'Unable find post';
      throw new ApolloError(ERR_MESSAGE);
    }

    if (post.likes?.includes(user._id)) {
      post.liked = true;
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
export const getPostsByUserId = async ({ dbConn, loggedIn, user }): Promise<Post> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);

  try {
    const post = (await PostModel(dbConn).find({ user: user._id })) as Post;

    if (post === null) {
      ERR_MESSAGE = 'Unable find posts';
      throw new ApolloError(ERR_MESSAGE);
    }

    return post;
  } catch (error) {
    throw new ApolloError(error);
  }
};

/**
 * @param context
 * @param id
 * @returns {Post}
 */
export const getPostsByUserLiked = async ({ dbConn, loggedIn, user }): Promise<Post> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);

  try {
    const post = (await PostModel(dbConn).find({ likes: user._id })) as Post;

    if (post === null) {
      ERR_MESSAGE = 'No liked posts';
      throw new ApolloError(ERR_MESSAGE);
    }

    return post;
  } catch (error) {
    throw new ApolloError(error);
  }
};

/**
 * @param context
 * @param id
 * @returns {Post}
 */
export const getPosts = async ({ dbConn, loggedIn }): Promise<Post[]> => {
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
export const deletePost = async (context: Context, { id }: { id: string }): Promise<Post> => {
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

/**
 * @param context
 * @param {id shotId}
 * @returns {Post}
 */
export const deletePostShot = async (
  context: Context,
  { id, shotId }: { id: string; shotId: string }
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

/**
 * @param context
 * @param {id shotId title content image}
 * @returns {Post}
 */
export const updatePostShot = async (
  context: Context,
  {
    id,
    shotId,
    title,
    content,
    image,
  }: { id: string; shotId: string; title: string; content: string; image: string }
): Promise<Post> => {
  const { dbConn, loggedIn } = context;
  let ERR_MESSAGE = 'Unable to update shot';
  loginRequired(loggedIn);

  try {
    const post = (await PostModel(dbConn).findByIdAndUpdate(id, {
      $set: {
        shots: { shotId, title, content, image },
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

/**
 * @param context
 * @param {id shotId title content image}
 * @returns {Post}
 */
export const updateWithPositionPostShot = async (
  context: Context,
  {
    id,
    shotId,
    position,
    title,
    content,
    image,
  }: { id: string; shotId: string; position: string; title: string; content: string; image: string }
): Promise<Post> => {
  const { dbConn, loggedIn } = context;
  let ERR_MESSAGE = 'Unable to update shot';
  loginRequired(loggedIn);

  try {
    (await PostModel(dbConn).findByIdAndUpdate(id, {
      $pull: {
        shots: { _id: shotId },
      },
    })) as Post;

    const post = (await PostModel(dbConn).findByIdAndUpdate(id, {
      $push: {
        shots: {
          $each: [{ _id: shotId, title, content, image }],
          $position: position,
        },
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

/**
 * @param context
 * @param {id}
 * @returns {Post}
 */
export const likePost = async (context: Context, id: string): Promise<Post | null> => {
  const { dbConn, loggedIn, user } = context;
  const ERR_MESSAGE = 'Unable to like post';
  loginRequired(loggedIn);

  let post;

  try {
    const hasLiked = (await PostModel(dbConn).findOne({ _id: id, likes: user?._id })) as Post;

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

    (await UserModel(dbConn).findByIdAndUpdate(user?._id, {
      $push: {
        likes: post._id,
      },
    })) as User;
  } catch (error) {
    throw new ApolloError(ERR_MESSAGE);
  }

  return post;
};

/**
 * @param context
 * @param {id}
 * @returns {Post}
 */
export const unlikePost = async (context: Context, id: string): Promise<Post> => {
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
    (await UserModel(dbConn).findByIdAndUpdate(user?._id, {
      $pull: {
        likes: post._id,
      },
    })) as User;
  } catch (error) {
    throw new ApolloError(ERR_MESSAGE);
  }

  return post;
};
