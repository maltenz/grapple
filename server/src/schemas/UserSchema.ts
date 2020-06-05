import { gql } from 'apollo-server';

/**
 * @description holds user schema
 */

export const UserSchema = gql`
  type User {
    id: ID
    name: String!
    password: String
    email: String!
  }

  type UserQuery {
    id: ID
    name: String!
    email: String!
  }

  type Token {
    id: ID!
    token: String!
    name: String!
    email: String!
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

  extend type Query {
    users: [UserQuery]
    user(id: String!): UserQuery
    userByEmail(email: String!): UserQuery
    userPosts(id: String!): [Post]
    userLiked(id: String!): [Post]
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): Token
    deleteUser(input: AuthUserInput): User
    loginUser(input: AuthUserInput): Token
  }
`;
