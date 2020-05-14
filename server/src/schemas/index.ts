import { UserSchema } from './UserSchema';
import { PostSchema } from './PostSchema';
import { MetricsSchema } from './MetricsSchema';
import { DefaultSchema } from './DefaultSchema';

/**
 * @description holds all schemas
 */

export const schema = [DefaultSchema, UserSchema, PostSchema, MetricsSchema];
