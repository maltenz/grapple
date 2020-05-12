import UserModel, { IUser } from '../models/UserModel';
import { ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 *
 * @description holds crud operations for the user entity
 */

/**
 * gets all users
 * @param context
 * @returns {User[]} user list
 */
export const getAllUsers = async ({ dbConn }): Promise<any> => {
  let list: IUser[];

  try {
    list = await UserModel(dbConn).find();
    if (list !== null && list.length > 0) {
      list = list.map((u) => {
        return u.transform();
      });
    } else {
      throw new ApolloError('No users found');
    }
  } catch (error) {
    console.error('> getAllUsers error: ', error);
    throw new ApolloError('Error retrieving all users');
  }

  return list;
};

/**
 * login user by id
 * @param context
 * @param id user id
 * @returns {User | null} user or null
 */
export const loginUser = async ({ dbConn }, input): Promise<any> => {
  let user: IUser | null;

  console.log('login');
  console.log(input.id);
  console.log(input.password);

  try {
    user = await UserModel(dbConn).findById(input.id);
    if (user !== null) {
      user = user.transform();
      console.log(user);
      const isPasswordValid = user.password === input.password;
      // await bcrypt.compare(input.password, user.password);
      if (!isPasswordValid) {
        throw new Error('Incorrect Password');
      }
      const secret = process.env.JWT_SECRET_KEY || 'mysecretkey';
      const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1d' });
      console.log(token);
      // return { token };
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('> getUser error: ', error);
    throw new ApolloError('Error retrieving user with id: ' + input.id);
  }

  return user;
};

/**
 * gets user by id
 * @param context
 * @param id user id
 * @returns {User | null} user or null
 */
export const getUser = async ({ dbConn }, id: string): Promise<any> => {
  let user: IUser | null;

  try {
    user = await UserModel(dbConn).findById(id);
    if (user !== null) {
      user = user.transform();
      console.log(user);
    }
  } catch (error) {
    console.error('> getUser error: ', error);
    throw new ApolloError('Error retrieving user with id: ' + id);
  }

  return user;
};

/**
 * gets user by id
 * @param context
 * @param email user
 * @returns {User | null} user or null
 */
export const getUserByEmail = async ({ dbConn }, email: string): Promise<any> => {
  let user: IUser | null;

  try {
    user = await UserModel(dbConn).findOne({ email });
    if (user !== null) {
      user = user.transform();
    }
  } catch (error) {
    console.error('> getUser error: ', error);
    throw new ApolloError('Error retrieving user with email: ' + email);
  }

  return user;
};

/**
 * creates user
 * @param context
 * @param args user
 * @returns {User} created user
 */
export const createUser = async ({ dbConn }, args: IUser): Promise<any> => {
  let createdUser: IUser;

  try {
    createdUser = (await UserModel(dbConn).create(args)).transform();
  } catch (error) {
    console.error('> createUser error: ', error);
    throw new ApolloError('Error saving user with name: ' + args.name);
  }

  return createdUser;
};

/**
 * deletes user
 * @param context
 * @param id user id
 * @returns {User | null} deleted user or null
 */
export const deleteUser = async ({ dbConn }, id: string): Promise<any> => {
  let deletedUser: IUser | null;

  try {
    deletedUser = await UserModel(dbConn).findByIdAndRemove(id);
    if (deletedUser !== null) {
      deletedUser = deletedUser.transform();
    }
  } catch (error) {
    console.error('> deleteUser error: ', error);
    throw new ApolloError('Error deleting user with id: ' + id);
  }

  return deletedUser;
};

/**
 * updates user
 * @param context
 * @param args user
 * @returns {User | null} updated user or null
 */
export const updateUser = async ({ dbConn }, args: IUser): Promise<any> => {
  let updatedUser: IUser | null;

  try {
    updatedUser = await UserModel(dbConn).findByIdAndUpdate(
      args.id,
      {
        name: args.name,
        email: args.email,
      },
      { new: true }
    );

    if (updatedUser !== null) {
      updatedUser = updatedUser.transform();
    }
  } catch (error) {
    console.error('> updateUser error: ', error);
    throw new ApolloError('Error updating user with id: ' + args.id);
  }

  return updatedUser;
};
