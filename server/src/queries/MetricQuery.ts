import { getAllMetrics } from '../controllers/MetricController';

/**
 * @description holds user metric
 */

export const MetricQuery = {
  metric: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await getAllMetrics(context);
    },
  },
};
