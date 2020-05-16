import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import UserModel, { User } from '../models/UserModel';
import { IncomingMessage } from 'http';
import { Context } from '../context';
import { ApolloError } from 'apollo-server';

/**
 * @description get user from context
 */

const getUserContext = async (dbConn: mongoose.Connection, user: User | null): Promise<User> => {
  try {
    let myUser;

    if (user?.id) {
      myUser = await UserModel(dbConn).findById(user.id);
    }

    if (!myUser) {
      throw new ApolloError('Oops, please you must login to continue');
    }
    return myUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getUserContext;
