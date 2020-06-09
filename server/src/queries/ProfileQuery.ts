/* eslint-disable @typescript-eslint/no-unused-vars */
import { Comment } from '../models/CommentModel';
import { getProfile } from '../controllers/ProfileController';
import { Profile } from '../models/ProfileModel';

export const ProfileQuery = {
  comments: {
    resolve: async (parent, args, context, info): Promise<Profile> => {
      return await getProfile(context, args);
    },
  },
};
