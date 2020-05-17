import { createShot, deleteShot } from '../controllers/ShotController';

/**
 * @description holds shot mutations
 */

export const ShotMutation = {
  createShot: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await createShot(context, args.input);
    },
  },
  deleteShot: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await deleteShot(context, args);
    },
  },
};
