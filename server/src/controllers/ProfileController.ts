import { ApolloError } from 'apollo-server';
import loginRequired from '../helper/loginRequired';
import { Context } from '../context';
import ProfileModel, { Profile, Reward, UpdateProfile } from '../models/ProfileModel';

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
      rewards: [],
      location: '',
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
 * @param {id}
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

interface RewardProfileArgs {
  user: string;
  type: Reward;
  nominate: boolean;
}

/**
 * @param context
 * @returns {Profile}
 */
export const rewardProfile = async (
  context: Context,
  args: RewardProfileArgs
): Promise<Profile> => {
  const { dbConn, loggedIn, user } = context;
  const { user: userArg, type, nominate } = args;
  const ERR_MESSAGE = 'Unable to reward profile';
  loginRequired(loggedIn);

  let profile: Profile;
  const selector = `rewards.${type}.${nominate ? 'nominated' : 'like'}`;

  let push;

  if (nominate) {
    Object.assign(push, { nominated: userArg });
  } else {
    Object.assign(push, { likes: userArg });
  }

  try {
    profile = (await ProfileModel(dbConn).findOneAndUpdate(
      { user: user?._id },
      {
        $push: {
          [selector]: push,
        },
      }
    )) as Profile;
  } catch (error) {
    throw new ApolloError(ERR_MESSAGE);
  }

  return profile;
};

/**
 * @param context
 * @param {id}
 * @returns {Profile}
 */

export const updateProfile = async (
  { dbConn, loggedIn, user }: Context,
  args
): Promise<Profile> => {
  let ERR_MESSAGE;
  loginRequired(loggedIn);
  const { bio, phone }: UpdateProfile = args.input;
  let profile;

  const set = {
    active: new Date(),
  };

  if (bio) {
    Object.assign(set, { bio });
  }

  if (phone) {
    Object.assign(set, { phone });
  }

  try {
    profile = (await ProfileModel(dbConn).findOneAndUpdate(
      { user: user?._id },
      {
        $set: set,
      }
    )) as Profile;

    if (profile === null) {
      ERR_MESSAGE = 'Unable to update profile';
      throw new ApolloError(ERR_MESSAGE);
    }
  } catch (error) {
    throw new ApolloError(error);
  }

  return profile;
};
