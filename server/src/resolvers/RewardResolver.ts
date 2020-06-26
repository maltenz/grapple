/* eslint-disable @typescript-eslint/no-unused-vars */
import { IResolvers, ApolloError } from 'apollo-server';
import { RewardQuery } from '../queries/RewardQuery';
import { RewardMutation } from '../mutations/RewardMutation';
import { getUser } from '../controllers/UserController';
import { User } from '../models/UserModel';
import { Context } from '../context';
import { getPostsByUserId, getPost } from '../controllers/PostController';
import { Post } from '../models/PostModel';
import { mongoose } from '@typegoose/typegoose';
import { Reward } from '../models/RewardModel';
import { getReward } from '../controllers/RewardController';

export const RewardResolver: IResolvers = {
  Query: RewardQuery,
  Mutation: RewardMutation,
  Reward: {
    reward: async (parent, args, context: Context, info): Promise<Reward | Reward[]> => {
      const id = parent.user?._id as mongoose.Types.ObjectId;

      try {
        return await getReward(context, args);
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
