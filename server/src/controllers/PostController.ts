import PostModel, { Post } from '../models/PostModel';
import { ApolloError } from 'apollo-server';
import { Context } from '../context';
import loginRequired from '../helper/loginRequired';

/**
 * @param context
 * @returns {Post}
 */
export const createPost = async ({ dbConn, loggedIn, user: propPost }: Context): Promise<Post> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);

  let post;

  try {
    post = (await PostModel(dbConn).create({ user: propPost._id })) as Post;
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
export const getPosts = async ({ dbConn, loggedIn }): Promise<Post> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);

  try {
    const post = (await PostModel(dbConn).find()) as Post;

    if (post === null) {
      ERR_MESSAGE = 'Unable find posts';
      throw new Error(ERR_MESSAGE);
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
  { dbConn, loggedIn }: Context,
  { id }: { id: string }
): Promise<Post> => {
  const ERR_MESSAGE = 'Unable to delete post';
  let post;

  loginRequired(loggedIn);

  try {
    await PostModel(dbConn).findByIdAndRemove(id);
  } catch (error) {
    throw new ApolloError(ERR_MESSAGE);
  }

  return post;
};
