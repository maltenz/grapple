import LikeModel, { ILike } from '../models/LikeModel';
import { ApolloError } from 'apollo-server';
import { Context } from '../context';
import loginRequired from '../helper/loginRequired';

/**
 * creates like
 * @param context
 * @param args like
 * @returns {Like} created like
 */
export const createLike = async ({ dbConn, loggedIn }: Context, args: ILike): Promise<any> => {
  let createdLike: ILike;

  loginRequired(loggedIn);

  const { id, ...rest } = args;

  try {
    createdLike = (await LikeModel(dbConn).create({ ...rest, metric: id })).transform();
  } catch (error) {
    console.error('> createLike error: ', error);
    throw new ApolloError('Error saving like');
  }

  return createdLike;
};

/**
 * gets like by id
 * @param context
 * @param id like id
 * @returns {Like | null} like or null
 */
export const getLike = async ({ dbConn, loggedIn }, id: string): Promise<any> => {
  let like: ILike | null;

  loginRequired(loggedIn);

  try {
    like = await LikeModel(dbConn).findById(id);
    if (like !== null) {
      like = like.transform();
    }
  } catch (error) {
    console.error('> getLike error: ', error);
    throw new ApolloError('Error retrieving like with id: ' + id);
  }

  return like;
};

/**
 * deletes like
 * @param context
 * @param id like id
 * @returns {Like | null} deleted like or null
 */
export const deleteLike = async ({ dbConn, loggedIn }, id: string): Promise<any> => {
  let deletedLike: ILike | null;

  loginRequired(loggedIn);

  try {
    deletedLike = await LikeModel(dbConn).findByIdAndRemove(id);

    if (deletedLike !== null) {
      deletedLike = deletedLike.transform();
    }
  } catch (error) {
    console.error('> deleteLike error: ', error);
    throw new ApolloError('Error deleting like with id: ' + id);
  }

  return deletedLike;
};
