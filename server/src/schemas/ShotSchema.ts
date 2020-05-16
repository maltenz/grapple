import { gql } from 'apollo-server';

/**
 * @description holds shot schema
 */

export const ShotSchema = gql`
  type Shots {
    id: ID!
    post: Post!
    list: [Shot]!
  }

  type Shot {
    id: ID!
    post: Post!
  }

  input ShotInput {
    id: ID!
    title: String
    content: String
    image: String
  }

  extend type Query {
    shot(id: String!): Shot
    shots(id: String!): Shots
  }

  extend type Mutation {
    createShot(input: ShotInput): Shot
    createShots(id: String!): Shots
    deleteShot(id: String!): Shot
  }
`;
