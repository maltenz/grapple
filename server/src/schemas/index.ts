import { UserSchema } from './UserSchema';
import { PostSchema } from './PostSchema';
import { MetricSchema } from './MetricSchema';
import { DefaultSchema } from './DefaultSchema';

/**
 * @description holds all schemas
 */

export const schema = [DefaultSchema, UserSchema, PostSchema, MetricSchema];
