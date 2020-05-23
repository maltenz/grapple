import { gql } from 'apollo-server';

/**
 * @description holds user schema
 */

export const ShotSchema = gql`
  type Shot {
    id: ID!
    title: String
    content: String
    image: String
  }

  input ShotInput {
    title: String
    content: String
    image: String
  }
`;
