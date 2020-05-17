/* eslint-disable @typescript-eslint/ban-ts-ignore */
import PostModel, { Post } from '../models/PostModel';
import { ApolloError } from 'apollo-server';
import { Context } from '../context';
import loginRequired from '../helper/loginRequired';

/**
 * creates post
 * @param context
 * @returns {Post} created post
 */
export const createPost = async ({ dbConn, loggedIn, user }: Context): Promise<Post> => {
  loginRequired(loggedIn);

  try {
    return (await PostModel(dbConn).create({ user: user._id })) as Post;
  } catch (error) {
    console.error('> createPost error: ', error);
    throw new ApolloError('Error saving post');
  }
};

/**
 * gets post by id
 * @param context
 * @param id post id
 * @returns {Post | null} post or null
 */
export const getPost = async ({ dbConn, loggedIn }, id: string): Promise<Post> => {
  loginRequired(loggedIn);

  try {
    return (await PostModel(dbConn).findById(id)) as Post;
  } catch (error) {
    console.error('> getPost error: ', error);
    throw new ApolloError('Error retrieving post with id: ' + id);
  }
};
