import { gql } from 'apollo-server';

export const CommentSchema = gql`
  type Comment {
    id: ID!
    text: String!
    post: Post!
    user: UserQuery!
  }

  extend type Query {
    comments: [Comment!]!
  }

  input CreateComment {
    comment: [CommentInput!]!
  }

  input CommentInput {
    id: ID!
    text: String!
  }

  extend type Mutation {
    createComment(input: CreateComment): Comment
    deleteComment(id: String!): Comment
    updateComment(input: CommentInput): Comment
  }
`;
