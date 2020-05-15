import { UserResolver } from './UserResolver';
import { PostResolver } from './PostResolver';
import { ShotResolver } from './ShotResolver';
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
  LikeResolver,
  ShareResolver,
  BookmarkResolver,
];
