/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAward, getAwards, getAwardMetrics } from '../controllers/AwardController';

import { Award } from '../models/AwardModel';
import { Context } from '../context';
import { AwardInput, AwardMetrics } from '../generated/graphql';

export const AwardQuery = {
  award: {
    resolve: async (
      parent: Award,
      args: { input: AwardInput },
      context: Context,
      info
    ): Promise<Award> => {
      return getAward(context, args);
    },
  },
  awards: {
    resolve: async (
      parent: Award,
      args: { input: AwardInput },
      context: Context,
      info
    ): Promise<Award[]> => {
      return getAwards(context, args);
    },
  },
  awardMetrics: {
    resolve: async (parent: Award, args, context: Context, info): Promise<AwardMetrics> => {
      return getAwardMetrics(context);
    },
  },
};
