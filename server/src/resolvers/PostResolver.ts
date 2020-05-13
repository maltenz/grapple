import { PostQuery } from '../queries/PostQuery';
import { PostMutation } from '../mutations/PostMutation';
import { IResolvers } from 'apollo-server';

/**
 * @description holds post resolver
 */

export const PostResolver: IResolvers = {
  Query: PostQuery,
  Mutation: PostMutation,
};
