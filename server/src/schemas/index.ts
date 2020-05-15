import { DefaultSchema } from './DefaultSchema';
import { UserSchema } from './UserSchema';
import { PostSchema } from './PostSchema';
import { ShotSchema } from './ShotSchema';
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
  ShotSchema,
  MetricSchema,
  LikeSchema,
  ShareSchema,
  BookmarkSchema,
];
