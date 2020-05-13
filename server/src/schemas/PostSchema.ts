import { gql } from 'apollo-server';

/**
 * @description holds user schema
 */

export const PostSchema = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    image: String!
  }

  input CreatePostInput {
    title: String!
    content: String!
    image: String!
  }

  extend type Mutation {
    createPost(input: CreatePostInput!): Post
  }
`;
