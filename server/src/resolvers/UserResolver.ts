import { IResolvers } from 'apollo-server';
import { UserQuery } from '../queries/UserQuery';
import { UserMutation } from '../mutations/UserMutation';

export const UserResolver: IResolvers = {
  Query: UserQuery,
  Mutation: UserMutation,
};
