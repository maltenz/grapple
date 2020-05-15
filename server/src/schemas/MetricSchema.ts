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
    comments: [UserQuery!]
    shared: [UserQuery!]
    bookmarks: [UserQuery!]
  }

  input MetricInput {
    likes: [ID!]
    comments: [ID!]
    shared: [ID!]
    bookmarks: [ID!]
  }

  extend type Query {
    metrics: [Metric]
  }

  extend type Mutation {
    createMetric(input: MetricInput!): Metric
  }
`;
