import jwt from 'jsonwebtoken';
import { getConnection } from './database/Provider';
import UserModel from './models/UserModel';

const getUser = async (dbConn, token) => {
  try {
    const user = await UserModel(dbConn).findOne({ email: token.email });
    if (!user) {
      throw new Error('User not found');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @description holds context for Apollo Server
 */

export const context = async (req): Promise<any> => {
  const dbConn = await getConnection();

  const token = req.req.headers.authorization || '';
  // const user = getUser(dbConn, token);

  console.log('userToken');
  // console.log(user);

  return {
    dbConn,
    // user
  };
};
