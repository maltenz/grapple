import ShotModel, { Shot } from '../models/ShotModel';
import { ApolloError } from 'apollo-server';
import { Context } from '../context';
import loginRequired from '../helper/loginRequired';
import { Post } from '../models/PostModel';

/**
 * @param context
 * @param {postId title content image order}
 * @returns {Shot}
 */
export const createShot = async (
  { dbConn, loggedIn, user }: Context,
  {
    postId,
    title,
    content,
    image,
    order,
  }: {
    postId: string;
    title: string;
    content: string;
    image: string;
    order: number;
  }
): Promise<Shot> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);

  let shot;

  try {
    shot = (await ShotModel(dbConn).create({
      user: user._id,
      postId,
      title,
      content,
      image,
      order,
    })) as Shot;
    if (shot === null) {
      ERR_MESSAGE = 'Unable to save shot';
      throw new Error(ERR_MESSAGE);
    }

    return shot;
  } catch (error) {
    throw new ApolloError(error);
  }
};

/**
 * @param context
 * @param id
 * @returns {Shot}
 */
export const getShot = async ({ dbConn, loggedIn }, id: string): Promise<Shot> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);

  try {
    const shot = (await ShotModel(dbConn).findById(id)) as Shot;

    if (shot === null) {
      ERR_MESSAGE = 'Unable find shot';
      throw new Error(ERR_MESSAGE);
    }
    return shot;
  } catch (error) {
    throw new ApolloError(error);
  }
};

/**
 * @param context
 * @param postId
 * @returns {Shot}
 */
export const getShots = async ({ dbConn, loggedIn }, postId: Post): Promise<Shot[]> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);

  try {
    const shot = (await ShotModel(dbConn).find({ postId })) as Shot[];

    if (!shot.length) {
      ERR_MESSAGE = 'No shots found';
      throw new Error(ERR_MESSAGE);
    }
    return shot;
  } catch (error) {
    throw new ApolloError(error);
  }
};

/**
 * @param context
 * @param {id}
 * @returns {Shot}
 */
export const deleteShot = async (
  { dbConn, loggedIn }: Context,
  { id }: { id: string }
): Promise<Shot> => {
  const ERR_MESSAGE = 'Unable to delete shot';
  let shot;

  loginRequired(loggedIn);

  try {
    shot = await ShotModel(dbConn).findByIdAndRemove(id);
  } catch (error) {
    throw new ApolloError(ERR_MESSAGE);
  }

  return shot;
};
