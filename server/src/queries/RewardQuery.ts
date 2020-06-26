/* eslint-disable @typescript-eslint/no-unused-vars */
import { getReward, RewardArgs } from '../controllers/RewardController';
import { Reward } from '../models/RewardModel';
import { Context } from '../context';

export const RewardQuery = {
  reward: {
    resolve: async (
      parent: Reward,
      args: { input: RewardArgs },
      context: Context,
      info
    ): Promise<Reward | Reward[]> => {
      return await getReward(context, args);
    },
  },
};
