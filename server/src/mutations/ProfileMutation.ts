/* eslint-disable @typescript-eslint/no-unused-vars */
import { createProfile } from '../controllers/ProfileController';
import { Profile } from '../models/ProfileModel';

export const ProfileMutation = {
  createProfile: {
    resolve: async (parent, args, context, info): Promise<Profile> => {
      return await createProfile(context);
    },
  },
};
