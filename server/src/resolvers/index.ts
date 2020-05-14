import { UserResolver } from './UserResolver';
import { PostResolver } from './PostResolver';
import { MetricsResolver } from './MetricsResolver';

/**
 * @description holds all resolvers
 */

export const resolvers = [UserResolver, PostResolver, MetricsResolver];
