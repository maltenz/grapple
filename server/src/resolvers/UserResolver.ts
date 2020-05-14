import { UserQuery } from '../queries/UserQuery';
import { UserMutation } from '../mutations/UserMutation';
import { IResolvers } from 'apollo-server';
import { Context } from '../context';
import { getUser } from '../controllers/UserController';
import { getAllPosts } from '../controllers/PostController';

/**
 * @description holds user resolver
 */

export const UserResolver: IResolvers = {
  Query: UserQuery,
  Mutation: UserMutation,
};
