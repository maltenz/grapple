import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import UserModel, { User } from '../models/UserModel';
import { IncomingMessage } from 'http';

/**
 * @description authenicates user
 */

const authenticate = async (
  dbConn: mongoose.Connection,
  req: { req: IncomingMessage }
): Promise<{
  loggedIn: boolean;
  user: User;
}> => {
  const bearer = req.req.headers.authorization || '';

  try {
    const myBearer = bearer.split(' ')[1];

    if (!myBearer) {
      return {
        loggedIn: false,
        user: {},
      };
    }

    const jwtPayload = jwt.verify(myBearer, process.env.JWT_SECRET_KEY || 'mysecretkey');

    const user = (await UserModel(dbConn).findOne({ email: jwtPayload.email })) as User;

    return {
      loggedIn: user?._id ? true : false,
      user,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default authenticate;
