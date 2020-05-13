import PostModel, { IPost } from '../models/PostModel';
import { ApolloError } from 'apollo-server';

/**
 * creates post
 * @param context
 * @param args post
 * @returns {Post} created post
 */
export const createPost = async ({ dbConn }, args: IPost): Promise<any> => {
  let createdPost: IPost;

  try {
    createdPost = (await PostModel(dbConn).create({ ...args })).transform();
  } catch (error) {
    console.error('> createPost error: ', error);
    throw new ApolloError('Error saving post with name: ' + args.title);
  }

  return createdPost;
};
