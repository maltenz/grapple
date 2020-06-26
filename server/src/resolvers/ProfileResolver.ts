/* eslint-disable @typescript-eslint/no-unused-vars */
import { IResolvers, ApolloError } from 'apollo-server';
import { ProfileQuery } from '../queries/ProfileQuery';
import { ProfileMutation } from '../mutations/ProfileMutation';
import { getUser } from '../controllers/UserController';
import { User } from '../models/UserModel';
import { Context } from '../context';
import { getPostsByUserId } from '../controllers/PostController';
import { Post } from '../models/PostModel';

export const ProfileResolver: IResolvers = {
  Query: ProfileQuery,
  Mutation: ProfileMutation,
  Profile: {
    user: async (parent, args, context: Context, info): Promise<User> => {
      try {
        return await getUser(context, parent.user);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    angelLikes: async (parent, args, context: Context, info): Promise<User[]> => {
      try {
        return await parent.angelLikes.map((id) => {
          return getUser(context, id);
        });
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    angelNominates: async (parent, args, context: Context, info): Promise<User[]> => {
      try {
        return await parent.angelNominates.map((id) => {
          return getUser(context, id);
        });
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    posts: async (parent, args, context: Context, info): Promise<Post[]> => {
      try {
        return await getPostsByUserId(context, { id: parent?.user?._id });
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
};
