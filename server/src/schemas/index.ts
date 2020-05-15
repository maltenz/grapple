import { DefaultSchema } from './DefaultSchema';
import { UserSchema } from './UserSchema';
import { PostSchema } from './PostSchema';
import { MetricSchema } from './MetricSchema';
import { LikeSchema } from './LikeSchema';

/**
 * @description holds all schemas
 */

export const schema = [DefaultSchema, UserSchema, PostSchema, MetricSchema, LikeSchema];
