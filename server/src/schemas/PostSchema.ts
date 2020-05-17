import { gql } from 'apollo-server';

/**
 * @description holds user schema
 */

export const PostSchema = gql`
  type Post {
    id: ID!
    user: UserQuery!
  }

  extend type Query {
    posts: [Post]
    post(id: String!): Post
  }

  extend type Mutation {
    createPost: Post
    deletePost(id: String!): Post
  }
`;
