import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import UserModel, { User } from '../models/UserModel';
import { IncomingMessage } from 'http';
import { Context } from '../context';
import { ApolloError } from 'apollo-server';
import { getUser } from '../controllers/UserController';

/**
 * @description get user from context
 */

const getUserContext = async (dbConn: mongoose.Connection, propUser: User): Promise<User> => {
  try {
    let user;

    if (propUser.id) {
      user = await getUser({ dbConn, loggedIn: true }, propUser.id);
    }

    if (!propUser) {
      throw new ApolloError('Oops, please you must login to continue');
    }

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getUserContext;
