/* eslint-disable @typescript-eslint/ban-ts-ignore */
import PostModel, { Post } from '../models/PostModel';
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
export const createPost = async (context: Context, args: Post): Promise<Post> => {
  const { dbConn, loggedIn, user: userContext } = context;
  let createdPostModel;
  let createdPost;
  let createdShot: IShot;
  let createdLike: ILike;
  let createdShare: IShare;
  let createdBookmark: IBookmark;

  loginRequired(loggedIn);

  try {
    const userId = userContext.id;

    createdPostModel = (await PostModel(dbConn).create({ user: userId })) as Post;

    if (createdPostModel) {
      createdPost = (await PostModel(dbConn).findById(createdPostModel.id)) as Post;
      // createdPost = createdPost.transform();
    }
    // console.log('createdPost');
    // console.log(createdPost);

    // const createdPostData = {
    //   user: user.id,
    //   post: createdPost.id,
    // };

    // createdShot = (
    //   await ShotModel(dbConn).create({ ...args, ...createdPostData, order: 0 })
    // ).transform();

    // createdLike = (await LikeModel(dbConn).create({ ...args, ...createdPostData })).transform();

    // createdShare = (await ShareModel(dbConn).create({ ...args, ...createdPostData })).transform();

    // createdBookmark = (
    //   await BookmarkModel(dbConn).create({ ...args, ...createdPostData })
    // ).transform();
    return createdPost.transform();
  } catch (error) {
    console.error('> createPost error: ', error);
    throw new ApolloError('Error saving post');
  }
};

/**
 * gets all posts
 * @param context
 * @returns {Post[]} post list
 */
export const getPosts = async ({ dbConn, loggedIn }): Promise<Post[]> => {
  let list;

  loginRequired(loggedIn);

  try {
    list = (await PostModel(dbConn).find()) as Post;
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
export const getPost = async ({ dbConn, loggedIn }, id: string): Promise<Post> => {
  let post;

  loginRequired(loggedIn);

  try {
    post = (await PostModel(dbConn).findById(id)) as Post;
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
export const deletePost = async ({ dbConn, loggedIn }, id: string): Promise<Post> => {
  let deletedPost;

  loginRequired(loggedIn);

  try {
    deletedPost = (await PostModel(dbConn).findByIdAndRemove(id)) as Post;
    if (deletedPost !== null) {
      deletedPost = deletedPost.transform();
    }
  } catch (error) {
    console.error('> deletePost error: ', error);
    throw new ApolloError('Error deleting post with id: ' + id);
  }

  return deletedPost;
};
