import { createMetrics } from '../controllers/MetricsController';

/**
 * @description holds metrics mutations
 */

export const MetricsMutation = {
  createMetrics: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await createMetrics(context, args.input);
    },
  },
};
