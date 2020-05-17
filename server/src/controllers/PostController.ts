import PostModel, { Post } from '../models/PostModel';
import { ApolloError } from 'apollo-server';
import { Context } from '../context';
import loginRequired from '../helper/loginRequired';

/**
 * @param context
 * @returns {Post}
 */
export const createPost = async ({ dbConn, loggedIn, user: propUser }: Context): Promise<Post> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);

  let user;

  try {
    user = (await PostModel(dbConn).create({ user: propUser._id })) as Post;
    if (!user._id) {
      ERR_MESSAGE = 'Unable to save post';
      throw new Error(ERR_MESSAGE);
    }
    return user;
  } catch (error) {
    throw new ApolloError(ERR_MESSAGE ? ERR_MESSAGE : error);
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

  let user;

  try {
    user = (await PostModel(dbConn).findById(id)) as Post;
    if (!user._id) {
      ERR_MESSAGE = 'Unable find post';
      throw new Error(ERR_MESSAGE);
    }
    return user;
  } catch (error) {
    throw new ApolloError(ERR_MESSAGE ? ERR_MESSAGE : error);
  }
};
