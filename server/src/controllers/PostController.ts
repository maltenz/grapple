/* eslint-disable @typescript-eslint/ban-ts-ignore */
import PostModel, { IPost } from '../models/PostModel';
import { ApolloError } from 'apollo-server';
import { Context, context } from '../context';
import loginRequired from '../helper/loginRequired';
import getUserContext from '../helper/getUserContext';
import MetricsModel, { IMetrics } from '../models/MetricsModel';

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
  let createdMetrics: IMetrics;

  loginRequired(loggedIn);

  try {
    const user = await getUserContext(dbConn, userContext);

    createdPost = (await PostModel(dbConn).create({ ...args, user: user.id })).transform();

    createdMetrics = (
      await MetricsModel(dbConn).create({ ...args, user: user.id, post: createdPost.id })
    ).transform();

    await PostModel(dbConn).findByIdAndUpdate(createdPost.id, {
      // @ts-ignore
      metrics: createdMetrics.id,
    });
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

/**
 * gets post by id
 * @param context
 * @param id post id
 * @returns {Post | null} post or null
 */
export const getPost = async ({ dbConn, loggedIn }, id: string): Promise<any> => {
  let post: IPost | null;

  loginRequired(loggedIn);

  try {
    post = await PostModel(dbConn).findById(id);
    if (post !== null) {
      post = post.transform();
    }
  } catch (error) {
    console.error('> getPost error: ', error);
    throw new ApolloError('Error retrieving post with id: ' + id);
  }

  return post;
};

/**
 * deletes post
 * @param context
 * @param id post id
 * @returns {User | null} deleted post or null
 */
export const deletePost = async ({ dbConn, loggedIn }, id: string): Promise<any> => {
  let deletedPost: IPost | null;

  loginRequired(loggedIn);

  try {
    deletedPost = await PostModel(dbConn).findByIdAndRemove(id);
    if (deletedPost !== null) {
      deletedPost = deletedPost.transform();
    }
  } catch (error) {
    console.error('> deletePost error: ', error);
    throw new ApolloError('Error deleting post with id: ' + id);
  }

  return deletedPost;
};
