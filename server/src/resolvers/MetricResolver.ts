import { MetricQuery } from '../queries/MetricQuery';
import { MetricMutation } from '../mutations/MetricMutation';
import { IResolvers } from 'apollo-server';
import { Context } from '../context';
import { getPost } from '../controllers/PostController';
import { getUser } from '../controllers/UserController';

/**
 * @description holds metric resolver
 */

export const MetricResolver: IResolvers = {
  Query: MetricQuery,
  Mutation: MetricMutation,
  // Metric: {
  //   user: async (parent, args, context: Context, info) => {
  //     try {
  //       return await getUser(context, parent.user);
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     }
  //   },
  //   post: async (parent, args, context: Context, info) => {
  //     try {
  //       return await getPost(context, parent.user);
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     }
  //   },
  // },
};
