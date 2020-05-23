import { gql } from 'apollo-server';

/**
 * @description holds user schema
 */

export const PostSchema = gql`
  type Post {
    id: ID!
    user: UserQuery!
    shots: [Shot]!
  }

  extend type Query {
    posts: [Post]
    post(id: String!): Post
  }

  input ShotDeleteInput {
    id: ID!
    shotId: ID!
  }

  input ShotUpdateInput {
    id: ID!
    shotId: ID!
    title: String!
    content: String!
    image: String!
  }

  extend type Mutation {
    createPost: Post
    deletePost(id: String!): Post
    deletePostShot(input: ShotDeleteInput): Post
    updatePostShot(input: ShotUpdateInput): Post
  }
`;
