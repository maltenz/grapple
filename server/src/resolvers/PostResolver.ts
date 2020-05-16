import { PostQuery } from '../queries/PostQuery';
import { PostMutation } from '../mutations/PostMutation';
import { IResolvers } from 'apollo-server';
import { Context } from '../context';
import { getUser } from '../controllers/UserController';
import { getShot } from '../controllers/ShotController';
import { getLike } from '../controllers/LikeController';
import { getShare } from '../controllers/ShareController';
import { getBookmark } from '../controllers/BookmarkController';

/**
 * @description holds post resolver
 */

export const PostResolver: IResolvers = {
  Query: PostQuery,
  Mutation: PostMutation,
  Post: {
    user: async (parent, args, context: Context, info) => {
      try {
        return await getUser(context, parent.user);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    shots: async (parent, args, context: Context, info) => {
      try {
        return await getShot(context, parent.shot);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    like: async (parent, args, context: Context, info) => {
      try {
        return await getLike(context, parent.like);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    share: async (parent, args, context: Context, info) => {
      try {
        return await getShare(context, parent.share);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    bookmark: async (parent, args, context: Context, info) => {
      try {
        return await getBookmark(context, parent.bookmark);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
