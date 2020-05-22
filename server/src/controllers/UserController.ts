import { ApolloError } from 'apollo-server';
import UserModel, { User } from '../models/UserModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import loginRequired from '../helper/loginRequired';
import { Context } from '../context';
import { mongoose } from '@typegoose/typegoose';

/**
 * @param context
 * @param {name email password}
 * @returns {User}
 */
export const createUser = async (
  { dbConn }: Context,
  { name, email, password }: { name: string; email: string; password: string }
): Promise<{ id: mongoose.Types.ObjectId; name: string; email: string; token: string }> => {
  let ERR_MESSAGE;

  try {
    const user = (await UserModel(dbConn).findOne({ email })) as User;

    if (user?._id) {
      ERR_MESSAGE = 'Email already in use';
      throw new ApolloError(ERR_MESSAGE);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = (await UserModel(dbConn).create({
      name,
      email,
      password: hashedPassword,
    })) as User;

    const secret = process.env.JWT_SECRET_KEY || 'mysecretkey';
    const token = jwt.sign({ email }, secret, { expiresIn: '1y' });

    if (newUser._id && newUser.name && newUser.email) {
      return {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token,
      };
    } else {
      ERR_MESSAGE = 'Oops something went wrong';
      throw new ApolloError(ERR_MESSAGE);
    }
  } catch (error) {
    throw new ApolloError(error);
  }
};

/**
 * @param context
 * @param id
 * @returns {User}
 */
export const loginUser = async (
  { dbConn },
  { email, password }: { email: string; password: string }
): Promise<{ token: string; id: string; name: string; email: string }> => {
  let ERR_MESSAGE;
  let user;

  try {
    user = (await UserModel(dbConn).findOne({ email: email })) as User;

    if (user === null) {
      ERR_MESSAGE = 'Email not found';
      throw new ApolloError(ERR_MESSAGE);
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        ERR_MESSAGE = 'Incorrect Password';
        throw new ApolloError(ERR_MESSAGE);
      }
      const secret = process.env.JWT_SECRET_KEY || 'mysecretkey';
      const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1y' });

      return { token, id: user.id, name: user.name, email: user.email };
    }
  } catch (error) {
    throw new ApolloError(error);
  }
};

/**
 * @param context
 * @returns {User[]}
 */
export const getUsers = async ({ dbConn, loggedIn }: Context): Promise<User[]> => {
  let ERR_MESSAGE;
  let list;

  loginRequired(loggedIn);

  try {
    list = (await UserModel(dbConn).find()) as User;

    if (list !== null && list.length > 0) {
      list = list.map((user) => user);
    }

    if (list === null) {
      ERR_MESSAGE = 'No user found';
      throw new ApolloError(ERR_MESSAGE);
    }
  } catch (error) {
    throw new ApolloError(error);
  }

  return list;
};

/**
 * @param context
 * @param id
 * @returns {User}
 */
export const getUser = async ({ dbConn, loggedIn }: Context, id: string): Promise<User> => {
  let ERR_MESSAGE;
  let user;

  loginRequired(loggedIn);

  try {
    user = (await UserModel(dbConn).findById(id)) as User;

    if (user === null) {
      ERR_MESSAGE = 'No user found';
      throw new ApolloError(ERR_MESSAGE);
    }
  } catch (error) {
    throw new ApolloError(error);
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
  let ERR_MESSAGE;
  let user;

  loginRequired(loggedIn);

  try {
    user = (await UserModel(dbConn).findOne({ email })) as User;

    if (user === null) {
      ERR_MESSAGE = 'No email found';
      throw new ApolloError(ERR_MESSAGE);
    }
  } catch (error) {
    throw new ApolloError(error);
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
  { email, password }: { email: string; password: string }
): Promise<User> => {
  let ERR_MESSAGE;
  let user;

  loginRequired(loggedIn);

  try {
    user = (await UserModel(dbConn).findOne({ email })) as User;

    if (user !== null) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        ERR_MESSAGE = 'Incorrect Password';
        throw new ApolloError(ERR_MESSAGE);
      }

      user = await UserModel(dbConn).findByIdAndRemove(user._id);
    } else {
      ERR_MESSAGE = 'Wrong email';
      throw new ApolloError('Wrong email');
    }
  } catch (error) {
    throw new ApolloError(error);
  }

  return user;
};
