import { GraphQLDateTime } from 'graphql-iso-date';
import { UserResolver } from './UserResolver';
import { PostResolver } from './PostResolver';
import { CommentResolver } from './CommentResolver';
import { ProfileResolver } from './ProfileResolver';
import { RewardResolver } from './RewardResolver';

const customDateScalarResolver = {
  Date: GraphQLDateTime,
};

export const resolvers = [
  customDateScalarResolver,
  UserResolver,
  PostResolver,
  CommentResolver,
  ProfileResolver,
  RewardResolver,
];
