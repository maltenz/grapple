/* eslint-disable @typescript-eslint/no-unused-vars */
import { IResolvers, ApolloError } from 'apollo-server';
import { mongoose } from '@typegoose/typegoose';
import { AwardQuery } from '../queries/AwardQuery';
import { AwardMutation } from '../mutations/AwardMutation';
import { getUser } from '../controllers/UserController';
import { User } from '../models/UserModel';
import { Context } from '../context';
import { getPost } from '../controllers/PostController';
import { Post } from '../models/PostModel';
import { Award } from '../generated/graphql';

export const AwardResolver: IResolvers = {
  Query: AwardQuery,
  Mutation: AwardMutation,
  Award: {
    owner: async (parent: Award, args, context: Context, info): Promise<User> => {
      // @ts-ignore
      const id = parent.owner?._id as mongoose.Types.ObjectId;

      try {
        return await getUser(context, id);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    subscriber: async (parent: Award, args, context: Context, info): Promise<User> => {
      // @ts-ignores
      const id = parent.subscriber?._id as mongoose.Types.ObjectId;

      try {
        return await getUser(context, id);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    post: async (parent: Award, args, context: Context, info): Promise<Post> => {
      // @ts-ignore
      const id = parent.post?._id as mongoose.Types.ObjectId;

      try {
        return await getPost(context, id);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
};
