import { GraphQLDateTime } from 'graphql-iso-date';
import { UserResolver } from './UserResolver';
import { PostResolver } from './PostResolver';
import { CommentResolver } from './CommentResolver';
import { ProfileResolver } from './ProfileResolver';
import { AwardResolver } from './AwardResolver';

const customDateScalarResolver = {
  Date: GraphQLDateTime,
};

export const resolvers = [
  customDateScalarResolver,
  UserResolver,
  PostResolver,
  CommentResolver,
  ProfileResolver,
  AwardResolver,
];
