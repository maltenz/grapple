import { createBookmark, deleteBookmark } from '../controllers/BookmarkController';

/**
 * @description holds bookmark mutations
 */

export const BookmarkMutation = {
  createBookmark: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await createBookmark(context, args.input);
    },
  },
  deleteBookmark: {
    resolve: async (parent, args, context, info): Promise<any> => {
      return await deleteBookmark(context, args.id);
    },
  },
};
