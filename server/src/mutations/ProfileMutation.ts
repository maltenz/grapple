/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createProfile,
  deleteProfile,
  updateProfile,
  rewardProfile,
} from '../controllers/ProfileController';
import { Profile } from '../models/ProfileModel';

export const ProfileMutation = {
  createProfile: {
    resolve: async (parent, args, context, info): Promise<Profile> => {
      return await createProfile(context);
    },
  },
  updateProfile: {
    resolve: async (parent, args, context, info): Promise<Profile> => {
      return await updateProfile(context, args);
    },
  },
  rewardProfile: {
    resolve: async (parent, args, context, info): Promise<Profile> => {
      return await rewardProfile(context, args);
    },
  },
  deleteProfile: {
    resolve: async (parent, args, context, info): Promise<Profile> => {
      return await deleteProfile(context);
    },
  },
};
