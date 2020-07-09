import { gql } from 'apollo-server';

/**
 * @description holds award schema
 */

export const AwardSchema = gql`
  type Award {
    id: ID
    award: AwardsEnum!
    nominate: Boolean!
    subscriber: User
    owner: User
    post: Post
  }

  input AwardInput {
    id: ID
    award: AwardsEnum
    nominate: Boolean
    subscriber: ID
    owner: ID
    post: ID
  }

  enum AwardsEnum {
    angel
    brave
    calming
    chatty
    funny
    helpful
    honest
    smart
    survivor
  }

  type AwardMetrics {
    angel: AwardMetricsItem!
    brave: AwardMetricsItem!
    calming: AwardMetricsItem!
    chatty: AwardMetricsItem!
    funny: AwardMetricsItem!
    helpful: AwardMetricsItem!
    honest: AwardMetricsItem!
    smart: AwardMetricsItem!
    survivor: AwardMetricsItem!
  }

  type AwardMetricsItem {
    count: Int!
  }

  extend type Query {
    award(input: AwardInput): Award
    awards(input: AwardInput): [Award]
    awardMetrics: AwardMetrics
  }

  extend type Mutation {
    createAward(input: AwardInput!): Award
  }
`;
