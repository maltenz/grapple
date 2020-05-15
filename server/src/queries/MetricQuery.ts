import { getAllMetrics, getMetric } from '../controllers/MetricController';

/**
 * @description holds user metric
 */

export const MetricQuery = {
  metrics: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await getAllMetrics(context);
    },
  },
  metric: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await getMetric(context, args.id);
    },
  },
};
