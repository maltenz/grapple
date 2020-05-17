import { getShot, getShots } from '../controllers/ShotController';
import { Shot } from '../models/ShotModel';

/**
 * @description holds shot queries
 */

export const ShotQuery = {
  shots: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await getShots(context);
    },
  },
  shot: {
    resolve: async (parent, args, context, info): Promise<Shot> => {
      return await getShot(context, args.id);
    },
  },
};
