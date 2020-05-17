import { gql } from 'apollo-server';

/**
 * @description holds user schema
 */

export const UserSchema = gql`
  type User {
    _id: ID!
    name: String!
    password: String!
    email: String!
    posts: [Post]
  }

  type UserQuery {
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

  input loginUserInput {
    password: String!
  }

  input UserInput {
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
    updateUser(input: UserInput!): User
    deleteUser(id: String!): User
    loginUser(input: loginUserInput): Token
  }
`;
