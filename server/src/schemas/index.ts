import { DefaultSchema } from './DefaultSchema';
import { UserSchema } from './UserSchema';
import { PostSchema } from './PostSchema';
import { MetricSchema } from './MetricSchema';
import { LikeSchema } from './LikeSchema';
import { ShareSchema } from './ShareSchema';
import { BookmarkSchema } from './BookmarkSchema';

/**
 * @description holds all schemas
 */

export const schema = [
  DefaultSchema,
  UserSchema,
  PostSchema,
  MetricSchema,
  LikeSchema,
  ShareSchema,
  BookmarkSchema,
];
