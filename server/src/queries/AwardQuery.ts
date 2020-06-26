/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAward, AwardArgs } from '../controllers/AwardController';
import { Award } from '../models/AwardModel';
import { Context } from '../context';

export const AwardQuery = {
  award: {
    resolve: async (
      parent: Award,
      args: { input: AwardArgs },
      context: Context,
      info
    ): Promise<Award | Award[]> => {
      return await getAward(context, args);
    },
  },
};
