import { getShot } from '../controllers/ShotController';

/**
 * @description holds shot queries
 */

export const ShotQuery = {
  shot: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await getShot(context, args.id);
    },
  },
};
