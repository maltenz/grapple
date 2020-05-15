import { ShareQuery } from '../queries/ShareQuery';
import { ShareMutation } from '../mutations/ShareMutation';
import { IResolvers } from 'apollo-server';
import { Context } from '../context';
import { getMetric } from '../controllers/MetricController';

/**
 * @description holds share resolver
 */

export const ShareResolver: IResolvers = {
  Query: ShareQuery,
  Mutation: ShareMutation,
  Share: {
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
