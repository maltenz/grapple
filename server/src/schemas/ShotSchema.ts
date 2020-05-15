import { gql } from 'apollo-server';

/**
 * @description holds shot schema
 */

export const ShotSchema = gql`
  type Shot {
    id: ID!
    post: Post!
  }

  input ShotInput {
    id: ID!
  }

  extend type Query {
    shot(id: String!): Shot
  }

  extend type Mutation {
    createShot(input: ShotInput): Shot
    deleteShot(id: String!): Shot
  }
`;
