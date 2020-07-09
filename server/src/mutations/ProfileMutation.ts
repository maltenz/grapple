/* eslint-disable @typescript-eslint/no-unused-vars */
import { createProfile, deleteProfile, updateProfile } from '../controllers/ProfileController';
import { Profile } from '../models/ProfileModel';
import { Context } from '../context';
import { ProfileInput } from '../generated/graphql';

export const ProfileMutation = {
  createProfile: {
    resolve: async (parent, args, context: Context, info): Promise<Profile> => {
      return createProfile(context);
    },
  },
  updateProfile: {
    resolve: async (parent, args: ProfileInput, context: Context, info): Promise<Profile> => {
      return updateProfile(context, args);
    },
  },
  deleteProfile: {
    resolve: async (parent, args, context: Context, info): Promise<Profile> => {
      return deleteProfile(context);
    },
  },
};
