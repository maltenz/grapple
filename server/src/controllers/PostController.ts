import PostModel, { IPost } from '../models/PostModel';
import { ApolloError } from 'apollo-server';
import { Context } from '../context';
import loginRequired from '../helper/loginRequired';

/**
 * creates post
 * @param context
 * @param args post
 * @returns {Post} created post
 */
export const createPost = async ({ dbConn, loggedIn }: Context, args: IPost): Promise<any> => {
  let createdPost: IPost;

  loginRequired(loggedIn);

  try {
    createdPost = (await PostModel(dbConn).create({ ...args })).transform();
  } catch (error) {
    console.error('> createPost error: ', error);
    throw new ApolloError('Error saving post with name: ' + args.title);
  }

  return createdPost;
};

/**
 * gets all posts
 * @param context
 * @returns {Post[]} post list
 */
export const getAllPosts = async ({ dbConn }): Promise<any> => {
  let list: IPost[];

  try {
    list = await PostModel(dbConn).find();
    if (list !== null && list.length > 0) {
      list = list.map((u) => {
        return u.transform();
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
