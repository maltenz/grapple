import { UserResolver } from './UserResolver';
import { PostResolver } from './PostResolver';
import { MetricResolver } from './MetricResolver';
import { LikeResolver } from './LikeResolver';

/**
 * @description holds all resolvers
 */

export const resolvers = [UserResolver, PostResolver, MetricResolver, LikeResolver];
