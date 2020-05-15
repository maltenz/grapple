import { getShare } from '../controllers/ShareController';

/**
 * @description holds share queries
 */

export const ShareQuery = {
  share: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await getShare(context, args.id);
    },
  },
};
