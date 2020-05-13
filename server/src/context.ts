import mongoose from 'mongoose';
import { getConnection } from './database/Provider';
import authenticate from './helper/authenticate';

/**
 * @description holds context for Apollo Server
 * @param dbConn
 * @param loggedIn
 * @returns {Context}
 */

export interface Context {
  dbConn: mongoose.Connection;
  loggedIn: boolean;
}

export const context = async (req): Promise<Context> => {
  const dbConn = await getConnection();
  const loggedIn = await authenticate(dbConn, req);

  return {
    dbConn,
    loggedIn,
  };
};
