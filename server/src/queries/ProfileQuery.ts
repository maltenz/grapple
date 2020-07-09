/* eslint-disable @typescript-eslint/no-unused-vars */
import { Comment } from '../models/CommentModel';
import { getProfile, getAuthProfile } from '../controllers/ProfileController';
import { Profile } from '../models/ProfileModel';
import { Context } from '../context';

export const ProfileQuery = {
  profile: {
    resolve: async (parent, args, context: Context, info): Promise<Profile> => {
      return getProfile(context, args);
    },
  },
  authProfile: {
    resolve: async (parent, args, context: Context, info): Promise<Profile> => {
      return getAuthProfile(context);
    },
  },
};
