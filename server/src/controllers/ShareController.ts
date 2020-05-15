import ShareModel, { IShare } from '../models/ShareModel';
import { ApolloError } from 'apollo-server';
import { Context } from '../context';
import loginRequired from '../helper/loginRequired';

/**
 * creates share
 * @param context
 * @param args share
 * @returns {Share} created share
 */
export const createShare = async ({ dbConn, loggedIn }: Context, args: IShare): Promise<any> => {
  let createdShare: IShare;

  loginRequired(loggedIn);

  const { id, ...rest } = args;

  try {
    createdShare = (await ShareModel(dbConn).create({ ...rest, metric: id })).transform();
  } catch (error) {
    console.error('> createShare error: ', error);
    throw new ApolloError('Error saving share');
  }

  return createdShare;
};

/**
 * gets share by id
 * @param context
 * @param id share id
 * @returns {Share | null} share or null
 */
export const getShare = async ({ dbConn, loggedIn }, id: string): Promise<any> => {
  let share: IShare | null;

  loginRequired(loggedIn);

  try {
    share = await ShareModel(dbConn).findById(id);
    if (share !== null) {
      share = share.transform();
    }
  } catch (error) {
    console.error('> getShare error: ', error);
    throw new ApolloError('Error retrieving share with id: ' + id);
  }

  return share;
};

/**
 * deletes share
 * @param context
 * @param id share id
 * @returns {Share | null} deleted share or null
 */
export const deleteShare = async ({ dbConn, loggedIn }, id: string): Promise<any> => {
  let deletedShare: IShare | null;

  loginRequired(loggedIn);

  try {
    deletedShare = await ShareModel(dbConn).findByIdAndRemove(id);

    if (deletedShare !== null) {
      deletedShare = deletedShare.transform();
    }
  } catch (error) {
    console.error('> deleteShare error: ', error);
    throw new ApolloError('Error deleting share with id: ' + id);
  }

  return deletedShare;
};
