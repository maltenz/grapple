import PostModel, { IPost } from '../models/PostModel';
import { ApolloError } from 'apollo-server';
import { Context, context } from '../context';
import loginRequired from '../helper/loginRequired';
import getUserContext from '../helper/getUserContext';

/**
 * creates post
 * @param context
 * @param args post
 * @returns {Post} created post
 */
export const createPost = async (
  { dbConn, loggedIn, user: userContext }: Context,
  args: IPost
): Promise<any> => {
  let createdPost: IPost;

  loginRequired(loggedIn);

  try {
    const user = await getUserContext(dbConn, userContext);
    createdPost = (await PostModel(dbConn).create({ ...args, user: user.id })).transform();
  } catch (error) {
    console.error('> createPost error: ', error);
    throw new ApolloError('Error saving post');
  }

  return createdPost;
};

/**
 * gets all posts
 * @param context
 * @returns {Post[]} post list
 */
export const getAllPosts = async ({ dbConn, loggedIn }): Promise<any> => {
  let list: IPost[];

  loginRequired(loggedIn);

  try {
    list = await PostModel(dbConn).find();
    if (list !== null && list.length > 0) {
      list = list.map((post) => {
        return post.transform();
      });
    } else {
      throw new ApolloError('No posts found');
    }
  } catch (error) {
    console.error('> getAllPosts error: ', error);
    throw new ApolloError('Error retrieving all posts');
  }

  return list;
};
