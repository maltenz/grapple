import { BookmarkQuery } from '../queries/BookmarkQuery';
import { BookmarkMutation } from '../mutations/BookmarkMutation';
import { IResolvers } from 'apollo-server';
import { Context } from '../context';
import { getPost } from '../controllers/PostController';

/**
 * @description holds bookmark resolver
 */

export const BookmarkResolver: IResolvers = {
  Query: BookmarkQuery,
  Mutation: BookmarkMutation,
  Bookmark: {
    post: async (parent, args, context: Context, info) => {
      try {
        return await getPost(context, parent.post);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
