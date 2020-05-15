import { LikeQuery } from '../queries/LikeQuery';
import { LikeMutation } from '../mutations/LikeMutation';
import { IResolvers } from 'apollo-server';
import { Context } from '../context';
import { getMetric } from '../controllers/MetricController';

/**
 * @description holds like resolver
 */

export const LikeResolver: IResolvers = {
  Query: LikeQuery,
  Mutation: LikeMutation,
  Like: {
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
