import { gql } from 'apollo-server';

/**
 * @description holds user schema
 */

export const PostSchema = gql`
  type Post {
    id: ID!
    items: [PostItem]
    user: UserQuery!
    metric: Metric!
  }

  type PostItem {
    title: String!
    content: String!
    image: String!
  }

  input PostInput {
    items: [PostItemInput]
  }

  input PostItemInput {
    title: String!
    content: String!
    image: String!
  }

  extend type Query {
    posts: [Post]
    post(id: String!): Post
  }

  extend type Mutation {
    createPost(input: PostInput!): Post
    deletePost(id: String!): Post
  }
`;
