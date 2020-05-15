import { gql } from 'apollo-server';

/**
 * @description holds bookmark schema
 */

export const BookmarkSchema = gql`
  type Bookmark {
    id: ID!
    post: Post!
  }

  input BookmarkInput {
    id: ID!
  }

  extend type Query {
    bookmark(id: String!): Bookmark
  }

  extend type Mutation {
    createBookmark(input: BookmarkInput): Bookmark
    deleteBookmark(id: String!): Bookmark
  }
`;
