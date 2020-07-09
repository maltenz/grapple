/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAward } from '../controllers/AwardController';
import { Award } from '../models/AwardModel';
import { Context } from '../context';
import { AwardInput } from '../generated/graphql';

export const AwardMutation = {
  createAward: {
    resolve: async (
      parent,
      args: { input: AwardInput },
      context: Context,
      info
    ): Promise<Award> => {
      return createAward(context, args);
    },
  },
};
