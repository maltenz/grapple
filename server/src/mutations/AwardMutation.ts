/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAward } from '../controllers/AwardController';
import { Award } from '../models/AwardModel';

export const AwardMutation = {
  createAward: {
    resolve: async (parent, args, context, info): Promise<Award> => {
      return await createAward(context, args.input);
    },
  },
};
