import ShotModel, { IShot } from '../models/ShotModel';
import { ApolloError } from 'apollo-server';
import { Context } from '../context';
import loginRequired from '../helper/loginRequired';

/**
 * creates shot
 * @param context
 * @param args shot
 * @returns {Shot} created shot
 */
export const createShot = async ({ dbConn, loggedIn }: Context, args: IShot): Promise<any> => {
  let createdShot: IShot;

  loginRequired(loggedIn);

  const { id, ...rest } = args;

  try {
    createdShot = (await ShotModel(dbConn).create({ ...rest, metric: id })).transform();
  } catch (error) {
    console.error('> createShot error: ', error);
    throw new ApolloError('Error saving shot');
  }

  return createdShot;
};

/**
 * gets shot by id
 * @param context
 * @param id shot id
 * @returns {Shot | null} shot or null
 */
export const getShot = async ({ dbConn, loggedIn }, id: string): Promise<any> => {
  let shot: IShot | null;

  loginRequired(loggedIn);

  try {
    shot = await ShotModel(dbConn).findById(id);

    if (shot !== null) {
      shot = shot.transform();
    }
  } catch (error) {
    console.error('> getShot error: ', error);
    throw new ApolloError('Error retrieving shot with id: ' + id);
  }

  return shot;
};

/**
 * deletes shot
 * @param context
 * @param id shot id
 * @returns {Shot | null} deleted shot or null
 */
export const deleteShot = async ({ dbConn, loggedIn }, id: string): Promise<any> => {
  let deletedShot: IShot | null;

  loginRequired(loggedIn);

  try {
    deletedShot = await ShotModel(dbConn).findByIdAndRemove(id);

    if (deletedShot !== null) {
      deletedShot = deletedShot.transform();
    }
  } catch (error) {
    console.error('> deleteShot error: ', error);
    throw new ApolloError('Error deleting shot with id: ' + id);
  }

  return deletedShot;
};
