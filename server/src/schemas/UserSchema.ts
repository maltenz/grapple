import { gql } from 'apollo-server';

/**
 * @description holds user schema
 */

export const UserSchema = gql`
  type User {
    id: ID
    name: String!
    password: String!
    email: String!
    posts: [Post]
  }

  type UserQuery {
    id: ID
    name: String!
    email: String!
    posts: [Post]
  }

  type Token {
    token: String!
  }

  input CreateUserInput {
    name: String!
    password: String!
    email: String!
  }

  input AuthUserInput {
    email: String!
    password: String!
  }

  input UpdateUserInput {
    name: String!
    email: String!
  }

  extend type Query {
    users: [UserQuery]
    user(id: String!): UserQuery
    userByEmail(email: String!): UserQuery
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): User
    deleteUser(input: AuthUserInput): User
    loginUser(input: AuthUserInput): Token
  }
`;
