/* eslint-disable @typescript-eslint/no-unused-vars */
import { Comment } from '../models/CommentModel';
import { getProfile, getAuthProfile } from '../controllers/ProfileController';
import { Profile } from '../models/ProfileModel';

export const ProfileQuery = {
  profile: {
    resolve: async (parent, args, context, info): Promise<Profile> => {
      return await getProfile(context, args);
    },
  },
  authProfile: {
    resolve: async (parent, args, context, info): Promise<Profile> => {
      return await getAuthProfile(context);
    },
  },
};
