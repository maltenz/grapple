/* eslint-disable @typescript-eslint/no-unused-vars */
import { createReward } from '../controllers/RewardController';
import { Reward } from '../models/RewardModel';

export const RewardMutation = {
  createReward: {
    resolve: async (parent, args, context, info): Promise<Reward> => {
      return await createReward(context, args.input);
    },
  },
};
