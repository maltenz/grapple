import jwt from 'jsonwebtoken';
import { getConnection } from './database/Provider';
import UserModel from './models/UserModel';

const verifyUser = async (dbConn, { req }) => {
  try {
    req.email = null;
    req.loggedInUserId = null;
    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
      const token = bearerHeader.split(' ')[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET_KEY || 'mysecretkey');
      req.email = payload.email;
      const user = await UserModel(dbConn).findOne({ email: payload.email });
      req.loggedInUserId = '892638768274243';
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

  const context = { email: '', loggedInUserId: '' };

  if (req) {
    // await verifyUser(dbConn, req);
    // context.email = req.req.email;
    // context.loggedInUserId = req.req.loggedInUserId;
    // console.log(context.email);
    // console.log(context.loggedInUserId);
  }

  return { dbConn, context };
};
