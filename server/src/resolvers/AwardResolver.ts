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
import { AwardArgs } from '../controllers/AwardController';

export const AwardResolver: IResolvers = {
  Query: AwardQuery,
  Mutation: AwardMutation,
  Award: {
    owner: async (parent, args, context: Context, info): Promise<User> => {
      const id = parent.owner?._id as mongoose.Types.ObjectId;

      try {
        return await getUser(context, id);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    subscriber: async (parent, args, context: Context, info): Promise<User> => {
      const id = parent.subscriber?._id as mongoose.Types.ObjectId;

      try {
        return await getUser(context, id);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    post: async (parent: AwardArgs, args, context: Context, info): Promise<Post> => {
      const id = parent.post?._id as mongoose.Types.ObjectId;

      try {
        return await getPost(context, id);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
};
