import LikeModel, { ILike } from '../models/LikeModel';
import { ApolloError } from 'apollo-server';
import { Context } from '../context';
import loginRequired from '../helper/loginRequired';
import getUserContext from '../helper/getUserContext';

/**
 * creates like
 * @param context
 * @param args like
 * @returns {Like} created like
 */
export const createLike = async (
  { dbConn, loggedIn, user: userContext }: Context,
  args: ILike
): Promise<any> => {
  let createdLike: ILike;

  loginRequired(loggedIn);

  try {
    const user = await getUserContext(dbConn, userContext);
    createdLike = (await LikeModel(dbConn).create({ ...args, user: user.id })).transform();
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
