import { mongoose } from '@typegoose/typegoose';
import PostModel, { Post } from '../models/PostModel';
import { ApolloError } from 'apollo-server';
import { Context } from '../context';
import loginRequired from '../helper/loginRequired';
import { createShot } from './ShotController';
import ShotModel from '../models/ShotModel';

/**
 * @param context
 * @returns {Post}
 */
export const createPost = async ({ dbConn, loggedIn, user }: Context): Promise<Post> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);

  let post;

  const tempValue = (mongoose.Types.ObjectId() as unknown) as Post;

  try {
    const shot = await createShot(
      { dbConn, loggedIn, user },
      {
        post: tempValue,
        title: 'Why read motivational sayings?',
        content:
          'For motivation! You might need a bit, if you can use last year’s list of goals this year because it’s as good as new.',
        image: 'https://source.unsplash.com/random/768x768',
        order: 0,
      }
    );

    post = (await PostModel(dbConn).create({
      user,
      shots: [shot._id],
    })) as Post;

    await ShotModel(dbConn).updateMany(
      { post: tempValue },
      { $set: { post: post._id } },
      { new: true }
    );

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
export const getPosts = async ({ dbConn, loggedIn }): Promise<Post[]> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);

  try {
    const post = (await PostModel(dbConn).find()) as Post[];

    if (!post.length) {
      ERR_MESSAGE = 'No posts found';
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
    post = await PostModel(dbConn).findByIdAndRemove(id);
  } catch (error) {
    throw new ApolloError(ERR_MESSAGE);
  }

  return post;
};
