import { createShare, deleteShare } from '../controllers/ShareController';

/**
 * @description holds share mutations
 */

export const ShareMutation = {
  createShare: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await createShare(context, args.input);
    },
  },
  deleteShare: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await deleteShare(context, args.id);
    },
  },
};
