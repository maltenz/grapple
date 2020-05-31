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

  type Shot {
    id: ID!
    title: String
    content: String
    image: String
  }

  extend type Query {
    posts: [Post]
    post(id: String!): Post
  }

  input CreatePost {
    shots: [ShotInput]!
  }

  input ShotDeleteInput {
    id: ID!
    shotId: ID!
  }

  input ShotInput {
    id: ID
    title: String!
    content: String!
    image: String!
  }

  input ShotUpdateInput {
    id: ID!
    shotId: ID!
    title: String!
    content: String!
    image: String!
  }

  input ShotUpdatePositionInput {
    id: ID!
    shotId: ID!
    position: Int!
    title: String!
    content: String!
    image: String!
  }

  extend type Mutation {
    createPost(input: CreatePost): Post
    deletePost(id: String!): Post
    deletePostShot(input: ShotDeleteInput): Post
    updatePostShot(input: ShotUpdateInput): Post
    updateWithPositionPostShot(input: ShotUpdatePositionInput): Post
  }
`;
