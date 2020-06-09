/* eslint-disable @typescript-eslint/no-unused-vars */
import { createProfile, deleteProfile } from '../controllers/ProfileController';
import { Profile } from '../models/ProfileModel';

export const ProfileMutation = {
  createProfile: {
    resolve: async (parent, args, context, info): Promise<Profile> => {
      return await createProfile(context);
    },
  },
  deleteProfile: {
    resolve: async (parent, args, context, info): Promise<Profile> => {
      return await deleteProfile(context);
    },
  },
};
