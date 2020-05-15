/* eslint-disable @typescript-eslint/ban-ts-ignore */
import PostModel, { IPost } from '../models/PostModel';
import { ApolloError } from 'apollo-server';
import { Context } from '../context';
import loginRequired from '../helper/loginRequired';
import getUserContext from '../helper/getUserContext';
import LikeModel, { ILike } from '../models/LikeModel';
import ShotModel, { IShot } from '../models/ShotModel';
import ShareModel, { IShare } from '../models/ShareModel';
import BookmarkModel, { IBookmark } from '../models/BookmarkModel';

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
  let createdShot: IShot;
  let createdLike: ILike;
  let createdShare: IShare;
  let createdBookmark: IBookmark;

  loginRequired(loggedIn);

  try {
    const user = await getUserContext(dbConn, userContext);
    const userId = user.id;

    createdPost = (await PostModel(dbConn).create({ ...args, user: userId })).transform();

    const createdPostData = {
      user: user.id,
      post: createdPost.id,
    };

    createdShot = (await ShotModel(dbConn).create({ ...args, ...createdPostData })).transform();

    createdLike = (await LikeModel(dbConn).create({ ...args, ...createdPostData })).transform();

    createdShare = (await ShareModel(dbConn).create({ ...args, ...createdPostData })).transform();

    createdBookmark = (
      await BookmarkModel(dbConn).create({ ...args, ...createdPostData })
    ).transform();

    const CreatedPost = await PostModel(dbConn).findByIdAndUpdate(createdPost.id, {
      // @ts-ignore
      shot: createdShot.id,
      // @ts-ignore
      like: createdLike.id,
      // @ts-ignore
      share: createdShare.id,
      // @ts-ignore
      bookmark: createdBookmark.id,
    });

    CreatedPost.transform();
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
export const getPosts = async ({ dbConn, loggedIn }): Promise<any> => {
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
    console.error('> getPosts error: ', error);
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
