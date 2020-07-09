import mongoose from 'mongoose';
import { IncomingMessage } from 'http';
import jwt from 'jsonwebtoken';
import { ApolloError } from 'apollo-server';
import UserModel, { User } from '../models/UserModel';

/**
 * @description authenicates user
 */

const authenticate = async (
  dbConn: mongoose.Connection,
  req: { req: IncomingMessage }
): Promise<{
  loggedIn: boolean;
  user: User | null;
}> => {
  const bearer = req.req.headers.authorization || '';

  try {
    const myBearer = bearer.split(' ')[1];

    if (!myBearer) {
      return {
        loggedIn: false,
        user: null,
      };
    }

    const jwtPayload = jwt.verify(myBearer, process.env.JWT_SECRET_KEY || 'mysecretkey');

    const user = (await UserModel(dbConn).findOne({ email: jwtPayload.email })) as User;

    return {
      loggedIn: !!user?._id,
      user,
    };
  } catch (error) {
    throw new ApolloError(error);
  }
};

export default authenticate;
