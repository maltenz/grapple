import { gql } from 'apollo-server';

/**
 * @description holds user schema
 */

export const MetricsSchema = gql`
  type Metrics {
    id: ID!
    user: UserQuery!
    likes: [UserQuery!]
    comments: [UserQuery!]
    shared: [UserQuery!]
    bookmarks: [UserQuery!]
  }

  input MetricsInput {
    likes: [ID!]
    comments: [ID!]
    shared: [ID!]
    bookmarks: [ID!]
  }

  extend type Query {
    metrics: [Metrics]
  }

  extend type Mutation {
    createMetrics(input: MetricsInput!): Metrics
  }
`;
