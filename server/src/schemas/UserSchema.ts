import { gql } from 'apollo-server';

/**
 * @description holds user schema
 */

export const UserSchema = gql`
  type User {
    id: ID!
    name: String!
    password: String!
    email: String!
  }

  input CreateUserInput {
    name: String!
    password: String!
    email: String!
  }

  input loginUserInput {
    id: String!
    password: String!
  }

  input UpdateUserInput {
    id: String!
    name: String!
    email: String!
  }

  extend type Query {
    users: [User]
    user(id: String!): User
    userByEmail(email: String!): User
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: String!): User
    loginUser(input: loginUserInput): User
  }
`;
