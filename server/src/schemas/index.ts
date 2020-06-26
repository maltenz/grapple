import { gql } from 'apollo-server';
import { DefaultSchema } from './DefaultSchema';
import { UserSchema } from './UserSchema';
import { PostSchema } from './PostSchema';
import { CommentSchema } from './CommentSchema';
import { ProfileSchema } from './ProfileSchema';
import { AwardSchema } from './AwardSchema';

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
  AwardSchema,
];
