import { gql } from 'apollo-server';

/**
 * @description holds user schema
 */

export const MetricSchema = gql`
  type Metric {
    id: ID!
    post: Post!
    user: UserQuery!
    likes: [UserQuery!]
    shares: [UserQuery!]
    bookmarks: [UserQuery!]
  }

  input MetricInput {
    likes: [ID!]
    shares: [ID!]
    bookmarks: [ID!]
  }

  extend type Query {
    metric(id: String!): Metric
    metrics: [Metric]
  }

  extend type Mutation {
    createMetric(input: MetricInput!): Metric
  }
`;
