import { BookmarkQuery } from '../queries/BookmarkQuery';
import { BookmarkMutation } from '../mutations/BookmarkMutation';
import { IResolvers } from 'apollo-server';
import { Context } from '../context';
import { getMetric } from '../controllers/MetricController';

/**
 * @description holds bookmark resolver
 */

export const BookmarkResolver: IResolvers = {
  Query: BookmarkQuery,
  Mutation: BookmarkMutation,
  Bookmark: {
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
