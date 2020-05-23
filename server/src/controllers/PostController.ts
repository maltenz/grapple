import PostModel, { Post } from '../models/PostModel';
import { ApolloError } from 'apollo-server';
import { Context } from '../context';
import loginRequired from '../helper/loginRequired';

/**
 * @param context
 * @returns {Post}
 */
export const createPost = async ({ dbConn, loggedIn, user }: Context): Promise<Post> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);

  let post;

  const testShot = {
    title: 'Why read motivational sayings?',
    content:
      'For motivation! You might need a bit, if you can use last year’s list of goals this year because it’s as good as new.',
    image: 'https://source.unsplash.com/random/768x768',
  };

  try {
    post = await PostModel(dbConn).create({
      user,
      shots: [testShot, testShot],
    });

    if (post === null) {
      ERR_MESSAGE = 'Unable to save post';
      throw new Error(ERR_MESSAGE);
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
export const getPost = async ({ dbConn, loggedIn }, id: string): Promise<Post> => {
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
 * @param id
 * @returns {Post}
 */
export const getPosts = async ({ dbConn, loggedIn }): Promise<Post[]> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);

  try {
    const post = (await PostModel(dbConn).find()) as Post[];

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
