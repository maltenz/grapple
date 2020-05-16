import { gql } from 'apollo-server';

/**
 * @description holds shot schema
 */

export const ShotSchema = gql`
  type Shot {
    id: ID!
    post: Post!
    user: UserQuery!
    title: String
    content: String
    image: String
    order: Int!
  }

  type Shots {
    list: [Shot]
    count: Int
  }

  input ShotInput {
    id: ID!
    title: String
    content: String
    image: String
    order: Int!
  }

  extend type Query {
    shot(id: String!): Shot
  }

  extend type Mutation {
    createShot(input: ShotInput): Shot
    deleteShot(id: String!): Shot
  }
`;
