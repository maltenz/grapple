/* eslint-disable @typescript-eslint/no-unused-vars */
import { IResolvers, ApolloError } from 'apollo-server';
import { AwardQuery } from '../queries/AwardQuery';
import { AwardMutation } from '../mutations/AwardMutation';
import { getUser } from '../controllers/UserController';
import { User } from '../models/UserModel';
import { Context } from '../context';
import { getPostsByUserId, getPost } from '../controllers/PostController';
import { Post } from '../models/PostModel';
import { mongoose } from '@typegoose/typegoose';
import { Award } from '../models/AwardModel';
import { getAward } from '../controllers/AwardController';

export const AwardResolver: IResolvers = {
  Query: AwardQuery,
  Mutation: AwardMutation,
  Award: {
    award: async (parent, args, context: Context, info): Promise<Award | Award[]> => {
      const id = parent.user?._id as mongoose.Types.ObjectId;

      try {
        return await getAward(context, args);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    user: async (parent, args, context: Context, info): Promise<User> => {
      const id = parent.user?._id as mongoose.Types.ObjectId;

      try {
        return await getUser(context, id);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    post: async (parent, args, context: Context, info): Promise<Post> => {
      const id = context.user?._id as mongoose.Types.ObjectId;

      try {
        return await getPost(context, id);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
};
