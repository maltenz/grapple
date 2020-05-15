import { MetricQuery } from '../queries/MetricQuery';
import { MetricMutation } from '../mutations/MetricMutation';
import { IResolvers } from 'apollo-server';

/**
 * @description holds metric resolver
 */

export const MetricResolver: IResolvers = {
  Query: MetricQuery,
  Mutation: MetricMutation,
};
