import { gql } from 'apollo-server';

/**
 * @description holds reward schema
 */

export const RewardSchema = gql`
  type Reward {
    reward: RewardsEnum!
    nominate: Boolean!
    user: User
    post: Post
  }

  input RewardInput {
    reward: RewardsEnum
    nominate: Boolean!
    user: ID!
    post: ID!
  }

  enum RewardsEnum {
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

  extend type Query {
    reward: Reward
  }

  extend type Mutation {
    createReward(input: RewardInput!): Reward
  }
`;
