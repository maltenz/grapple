import { gql } from 'apollo-server';

/**
 * @description holds award schema
 */

export const AwardSchema = gql`
  type Award {
    award: AwardsEnum!
    nominate: Boolean!
    subscriber: User
    owner: User
    post: Post
  }

  input AwardInput {
    award: AwardsEnum
    nominate: Boolean!
    owner: ID!
    post: ID!
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

  extend type Query {
    award: Award
    awards: [Award]
  }

  extend type Mutation {
    createAward(input: AwardInput!): Award
  }
`;
