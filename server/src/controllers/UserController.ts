import UserModel, { User } from '../models/UserModel';
import { ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import loginRequired from '../helper/loginRequired';
import { Context } from '../context';

/**
 * @param context
 * @param {name email password}
 * @returns {User}
 */
export const createUser = async (
  { dbConn }: Context,
  { name, email, password }: { name: string; email: string; password: string }
): Promise<User> => {
  let createdUser;

  try {
    const user = (await UserModel(dbConn).findOne({ email })) as User;

    if (user) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    createdUser = await UserModel(dbConn).create({ password: hashedPassword });
  } catch (error) {
    console.error('> createUser error: ', error);
    throw new ApolloError('Error saving user with name: ' + name);
  }

  return createdUser;
};

/**
 * @param context
 * @param id
 * @returns {User}
 */
export const loginUser = async (
  { dbConn, token },
  { id, email, password }: { id: string; email: string; password: string }
): Promise<{ token: string }> => {
  let user;

  try {
    user = (await UserModel(dbConn).findOne({ email: email })) as User;

    if (user !== null) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
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
    throw new ApolloError('Error retrieving user with id: ' + id);
  }
};

/**
 * @param context
 * @returns {User[]}
 */
export const getUsers = async ({ dbConn, loggedIn }: Context): Promise<User[]> => {
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
 * @param context
 * @param id
 * @returns {User}
 */
export const getUser = async ({ dbConn, loggedIn }: Context, id: string): Promise<User> => {
  let user;

  loginRequired(loggedIn);

  try {
    user = (await UserModel(dbConn).findById(id)) as User;
  } catch (error) {
    console.error('> getUser error: ', error);
    throw new ApolloError('Error retrieving user with id: ' + id);
  }

  return user;
};

/**
 * @param context
 * @param email
 * @returns {User}
 */
export const getUserByEmail = async (
  { dbConn, loggedIn }: Context,
  email: string
): Promise<User> => {
  let user;

  loginRequired(loggedIn);

  try {
    user = (await UserModel(dbConn).findOne({ email })) as User;
  } catch (error) {
    console.error('> getUser error: ', error);
    throw new ApolloError('Error retrieving user with email: ' + email);
  }

  return user;
};

/**
 * @param context
 * @param {email password}
 * @returns {User}
 */
export const deleteUser = async (
  { dbConn, loggedIn }: Context,
  { id, email, password }: { id: string; email: string; password: string }
): Promise<User> => {
  let user;

  loginRequired(loggedIn);

  try {
    user = (await UserModel(dbConn).findOne({ email })) as User;

    if (user !== null) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Incorrect Password');
      }

      user = await UserModel(dbConn).findByIdAndRemove(user._id);
    } else {
      throw new Error('Wrong email');
    }
  } catch (error) {
    console.error('> loginUser error: ', error);
    throw new ApolloError('Error retrieving user with id: ' + id);
  }

  return user;
};
