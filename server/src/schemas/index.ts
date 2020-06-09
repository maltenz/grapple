import { gql } from 'apollo-server';
import { DefaultSchema } from './DefaultSchema';
import { UserSchema } from './UserSchema';
import { PostSchema } from './PostSchema';
import { CommentSchema } from './CommentSchema';

const typeDefs = gql`
  scalar Date
`;

export const schema = [typeDefs, DefaultSchema, UserSchema, PostSchema, CommentSchema];
