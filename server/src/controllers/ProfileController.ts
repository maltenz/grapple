import { ApolloError } from 'apollo-server';
import loginRequired from '../helper/loginRequired';
import { Context } from '../context';
import ProfileModel, { Profile } from '../models/ProfileModel';

/**
 * @param context
 * @returns {Profile}
 */
export const createProfile = async ({ dbConn, loggedIn, user }: Context): Promise<Profile> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);

  let profile;

  try {
    const hasProfile = await ProfileModel(dbConn).findOne({ user: user?._id });

    if (hasProfile) {
      ERR_MESSAGE = 'Profile already exists';
      throw new Error(ERR_MESSAGE);
    }

    profile = (await ProfileModel(dbConn).create({
      user: user?._id,
      bio: '',
      skills: [],
      address: [],
      phone: '',
      active: new Date(),
    })) as Profile;

    if (profile === null) {
      ERR_MESSAGE = 'Unable to create profile';
      throw new Error(ERR_MESSAGE);
    }

    return profile;
  } catch (error) {
    throw new ApolloError(error);
  }
};

/**
 * @param context
 * @returns {Profile}
 */
export const getProfile = async ({ dbConn, loggedIn }: Context, args): Promise<Profile> => {
  let ERR_MESSAGE;
  const { id } = args;
  let profile;

  loginRequired(loggedIn);

  try {
    profile = (await ProfileModel(dbConn).findOne({ user: id })) as Profile;

    if (profile === null) {
      ERR_MESSAGE = 'No profile found';
      throw new ApolloError(ERR_MESSAGE);
    }
  } catch (error) {
    throw new ApolloError(error);
  }

  return profile;
};

/**
 * @param context
 * @param {id}
 * @returns {Profile}
 */
export const deleteProfile = async (context: Context): Promise<Profile> => {
  const { dbConn, loggedIn } = context;
  const ERR_MESSAGE = 'Unable to delete profile';
  loginRequired(loggedIn);

  let profile;

  try {
    profile = await ProfileModel(dbConn).findOneAndDelete({ user: context.user?._id });
  } catch (error) {
    throw new ApolloError(ERR_MESSAGE);
  }

  return profile;
};
