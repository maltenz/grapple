import { LikeQuery } from '../queries/LikeQuery';
import { LikeMutation } from '../mutations/LikeMutation';
import { IResolvers } from 'apollo-server';

/**
 * @description holds like resolver
 */

export const LikeResolver: IResolvers = {
  Query: LikeQuery,
  Mutation: LikeMutation,
};
