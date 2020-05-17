import UserModel, { User } from '../models/UserModel';
import { ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import loginRequired from '../helper/loginRequired';
import { Context } from 'vm';

/**
 * creates user
 * @param context
 * @param args user
 * @returns {User} created user
 */
export const createUser = async ({ dbConn }, args: User): Promise<User> => {
  let createdUser;

  try {
    const user = (await UserModel(dbConn).findOne({ email: args.email })) as User;

    if (user) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(args.password, 12);

    createdUser = await UserModel(dbConn).create({ ...args, password: hashedPassword });
  } catch (error) {
    console.error('> createUser error: ', error);
    throw new ApolloError('Error saving user with name: ' + args.name);
  }

  return createdUser;
};

/**
 * login user by id
 * @param context
 * @param id user id
 * @returns {User | null} user or null
 */
export const loginUser = async ({ dbConn, token }, input: User): Promise<{ token: string }> => {
  let user;

  try {
    user = (await UserModel(dbConn).findOne({ email: input.email })) as User;

    if (user !== null) {
      const isPasswordValid = await bcrypt.compare(input.password, user.password);
      if (!isPasswordValid) {
        throw new Error('Incorrect Password');
      }
      const secret = process.env.JWT_SECRET_KEY || 'mysecretkey';
      const myToken = jwt.sign({ email: user.email }, secret, { expiresIn: '1y' });
      token = myToken;

      return { token };
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('> loginUser error: ', error);
    throw new ApolloError('Error retrieving user with id: ' + input._id);
  }
};

/**
 * gets all users
 * @param context
 * @returns {User[]} user list
 */
export const getUsers = async ({ dbConn, loggedIn }): Promise<User[]> => {
  let list;

  loginRequired(loggedIn);

  try {
    list = (await UserModel(dbConn).find()) as User;
    if (list !== null && list.length > 0) {
      list = list.map((user) => user);
    } else {
      throw new ApolloError('No users found');
    }
  } catch (error) {
    console.error('> getUsers error: ', error);
    throw new ApolloError('Error retrieving all users');
  }

  return list;
};

/**
 * gets user by id
 * @param context
 * @param id user id
 * @returns {User | null} user or null
 */
export const getUser = async ({ dbConn, loggedIn }, _id: string): Promise<User> => {
  let user;

  loginRequired(loggedIn);

  try {
    user = (await UserModel(dbConn).findById(_id)) as User;
  } catch (error) {
    console.error('> getUser error: ', error);
    throw new ApolloError('Error retrieving user with _id: ' + _id);
  }

  return user;
};

/**
 * gets user by id
 * @param context
 * @param email user
 * @returns {User | null} user or null
 */
export const getUserByEmail = async ({ dbConn }: Context, email: string): Promise<User> => {
  let user;

  try {
    user = (await UserModel(dbConn).findOne({ email })) as User;
  } catch (error) {
    console.error('> getUser error: ', error);
    throw new ApolloError('Error retrieving user with email: ' + email);
  }

  return user;
};

/**
 * deletes user
 * @param context
 * @param id user id
 * @returns {User | null} deleted user or null
 */
export const deleteUser = async ({ dbConn, loggedIn }, _id: string): Promise<User> => {
  let deletedUser;

  loginRequired(loggedIn);

  try {
    deletedUser = (await UserModel(dbConn).findByIdAndRemove(_id)) as User;
  } catch (error) {
    console.error('> deleteUser error: ', error);
    throw new ApolloError('Error deleting user with _id: ' + _id);
  }

  return deletedUser;
};

/**
 * updates user
 * @param context
 * @param args user
 * @returns {User | null} updated user or null
 */
export const updateUser = async ({ dbConn, loggedIn }, args: User): Promise<User> => {
  let updatedUser;

  loginRequired(loggedIn);

  try {
    updatedUser = (await UserModel(dbConn).findByIdAndUpdate(
      args._id,
      {
        name: args.name,
        email: args.email,
      },
      { new: true }
    )) as User;
  } catch (error) {
    console.error('> updateUser error: ', error);
    throw new ApolloError('Error updating user with _id: ' + args._id);
  }

  return updatedUser;
};
