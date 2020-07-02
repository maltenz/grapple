/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  getAward,
  AwardArgs,
  getAwards,
  getAwardMetrics,
  AwardMetrics,
} from '../controllers/AwardController';

import { Award } from '../models/AwardModel';
import { Context } from '../context';

export const AwardQuery = {
  award: {
    resolve: async (
      parent: Award,
      args: { input: AwardArgs },
      context: Context,
      info
    ): Promise<Award> => {
      return await getAward(context, args);
    },
  },
  awards: {
    resolve: async (
      parent: Award,
      args: { input: AwardArgs },
      context: Context,
      info
    ): Promise<Award[]> => {
      return await getAwards(context, args);
    },
  },
  awardMetrics: {
    resolve: async (parent: Award, args, context: Context, info): Promise<AwardMetrics> => {
      return await getAwardMetrics(context);
    },
  },
};
