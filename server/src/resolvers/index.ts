import { UserResolver } from './UserResolver';
import { PostResolver } from './PostResolver';
import { ShotResolver } from './ShotResolver';
import { MetricResolver } from './MetricResolver';
import { LikeResolver } from './LikeResolver';
import { ShareResolver } from './ShareResolver';
import { BookmarkResolver } from './BookmarkResolver';

/**
 * @description holds all resolvers
 */

export const resolvers = [
  UserResolver,
  PostResolver,
  ShotResolver,
  MetricResolver,
  LikeResolver,
  ShareResolver,
  BookmarkResolver,
];
