import { gql } from 'apollo-server';

export const CommentSchema = gql`
  type Comment {
    text: String!
    post: Post!
    user: UserQuery!
  }

  extend type Query {
    comments(id: String!): [Comment!]!
  }

  input CommentInput {
    id: ID!
    text: String!
  }

  extend type Mutation {
    createComment(input: CommentInput): Comment
    deleteComment(id: String!): Comment
    updateComment(input: CommentInput): Comment
  }
`;
