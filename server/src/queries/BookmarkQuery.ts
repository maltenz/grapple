import { getBookmark } from '../controllers/BookmarkController';

/**
 * @description holds book queries
 */

export const BookmarkQuery = {
  bookmark: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await getBookmark(context, args.id);
    },
  },
};
