import { gql } from 'apollo-server';
import { DefaultSchema } from './DefaultSchema';
import { UserSchema } from './UserSchema';
import { PostSchema } from './PostSchema';
import { CommentSchema } from './CommentSchema';
import { ProfileSchema } from './ProfileSchema';
import { RewardSchema } from './RewardSchema';

const typeDefs = gql`
  scalar Date
`;

export const schema = [
  typeDefs,
  DefaultSchema,
  UserSchema,
  PostSchema,
  CommentSchema,
  ProfileSchema,
  RewardSchema,
];
