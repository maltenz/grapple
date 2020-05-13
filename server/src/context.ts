import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';
import { getConnection } from './database/Provider';
import UserModel from './models/UserModel';

const authenticate = async (dbConn, authorization) => {
  try {
    const bearer = authorization.split(' ')[1];
    const jwtPayload = jwt.verify(bearer, process.env.JWT_SECRET_KEY || 'mysecretkey');
    const user = await UserModel(dbConn).findOne({ email: jwtPayload.email });
    return { user };
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

  const bearer = req.req.headers.authorization || '';
  const user = await authenticate(dbConn, bearer);

  if (!user) {
    throw new AuthenticationError('you must be logged in');
  }

  return {
    dbConn,
    loggedIn: !user ? false : true,
    token: '',
  };
};
