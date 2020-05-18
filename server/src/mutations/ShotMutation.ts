/* eslint-disable @typescript-eslint/no-unused-vars */
import { createShot, deleteShot } from '../controllers/ShotController';
import { Shot } from '../models/ShotModel';

/**
 * @description holds shot mutations
 */

export const ShotMutation = {
  createShot: {
    resolve: async (parent, args, context, info): Promise<Shot> => {
      return await createShot(context, args.input);
    },
  },
  deleteShot: {
    resolve: async (parent, args, context, info): Promise<Shot> => {
      return await deleteShot(context, args);
    },
  },
};
