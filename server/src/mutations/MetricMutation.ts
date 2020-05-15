import { createMetric } from '../controllers/MetricController';

/**
 * @description holds metric mutations
 */

export const MetricMutation = {
  createMetric: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await createMetric(context, args.input);
    },
  },
};
