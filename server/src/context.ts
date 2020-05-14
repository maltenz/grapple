import mongoose from 'mongoose';
import { getConnection } from './database/Provider';
import authenticate from './helper/authenticate';
import { IUser } from './models/UserModel';

/**
 * @description holds context for Apollo Server
 * @param dbConn
 * @param loggedIn
 * @returns {Context}
 */

export interface Context {
  dbConn: mongoose.Connection;
  loggedIn: boolean;
  user: IUser | null;
}

export const context = async (req): Promise<Context> => {
  const dbConn = await getConnection();
  const { loggedIn, user } = await authenticate(dbConn, req);

  return {
    dbConn,
    loggedIn,
    user,
  };
};
