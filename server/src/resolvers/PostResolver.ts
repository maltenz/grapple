import { PostQuery } from '../queries/PostQuery';
import { PostMutation } from '../mutations/PostMutation';
import { IResolvers } from 'apollo-server';
import { Context } from '../context';
import { getUser } from '../controllers/UserController';
import { getMetric } from '../controllers/MetricController';

/**
 * @description holds post resolver
 */

export const PostResolver: IResolvers = {
  Query: PostQuery,
  Mutation: PostMutation,
  Post: {
    user: async (parent, args, context: Context, info) => {
      try {
        return await getUser(context, parent.user);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    metric: async (parent, args, context: Context, info) => {
      try {
        return await getMetric(context, parent.metric);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
