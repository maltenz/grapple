import { MetricsQuery } from '../queries/MetricsQuery';
import { MetricsMutation } from '../mutations/MetricsMutation';
import { IResolvers } from 'apollo-server';
import { Context } from '../context';
import { getPost } from '../controllers/PostController';
import { getUser } from '../controllers/UserController';

/**
 * @description holds metrics resolver
 */

export const MetricsResolver: IResolvers = {
  Query: MetricsQuery,
  Mutation: MetricsMutation,
  Metrics: {
    user: async (parent, args, context: Context, info) => {
      try {
        return await getUser(context, parent.user);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    post: async (parent, args, context: Context, info) => {
      try {
        return await getPost(context, parent.user);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
