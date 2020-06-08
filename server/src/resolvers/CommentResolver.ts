import { IResolvers } from 'apollo-server';
import { CommentQuery } from '../queries/CommentQuery';
import { CommentMutation } from '../mutations/CommentMutation';

/**
 * @description holds user comment
 */

export const CommentResolver: IResolvers = {
  Query: CommentQuery,
  Mutation: CommentMutation,
};
