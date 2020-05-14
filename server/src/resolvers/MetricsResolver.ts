import { MetricsQuery } from '../queries/MetricsQuery';
import { MetricsMutation } from '../mutations/MetricsMutation';
import { IResolvers } from 'apollo-server';

/**
 * @description holds user resolver
 */

export const MetricsResolver: IResolvers = {
  Query: MetricsQuery,
  Mutation: MetricsMutation,
};
