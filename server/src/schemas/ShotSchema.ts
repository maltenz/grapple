import { gql } from 'apollo-server';

/**
 * @description holds user schema
 */

export const ShotSchema = gql`
  type Shot {
    id: ID!
    user: UserQuery!
  }

  extend type Query {
    shots: [Shot]
    shot(id: String!): Shot
  }

  extend type Mutation {
    createShot: Shot
    deleteShot(id: String!): Shot
  }
`;
