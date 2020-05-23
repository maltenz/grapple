import { gql } from 'apollo-server';

/**
 * @description holds user schema
 */

export const ShotSchema = gql`
  type Shot {
    id: ID!
    user: UserQuery!
    post: Post!
    title: String
    content: String
    image: String
  }

  input ShotInput {
    post: ID!
    title: String
    content: String
    image: String
  }

  extend type Query {
    shots(id: String!): [Shot]
    shot(id: String!): Shot
  }

  extend type Mutation {
    createShot(input: ShotInput): Shot
    deleteShot(id: String!): Shot
  }
`;
