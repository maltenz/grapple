import { getAllMetrics } from '../controllers/MetricsController';

/**
 * @description holds user metrics
 */

export const MetricsQuery = {
  metrics: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await getAllMetrics(context);
    },
  },
};
