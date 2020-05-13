import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';

/**
 * @description authenicates user
 */

const authenticate = async (dbConn, req) => {
  const bearer = req.req.headers.authorization || '';

  try {
    const myBearer = bearer.split(' ')[1];

    if (!myBearer) {
      return false;
    }

    const jwtPayload = jwt.verify(myBearer, process.env.JWT_SECRET_KEY || 'mysecretkey');
    const user = await UserModel(dbConn).findOne({ email: jwtPayload.email });

    return user !== null ? true : false;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default authenticate;
