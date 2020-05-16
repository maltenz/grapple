import { gql } from 'apollo-server';

/**
 * @description holds user schema
 */

export const PostSchema = gql`
  type Post {
    id: ID!
    user: UserQuery!
    post: Post!
    shots: Shots!
    like: Like!
    share: Share!
    bookmark: Bookmark!
  }

  input PostInput {
    user: ID!
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
