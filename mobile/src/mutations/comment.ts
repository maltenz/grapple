import { gql } from 'apollo-boost';

const CREATE_COMMENT = gql`
  mutation createComment($id: ID!, $text: String!) {
    createComment(input: { id: $id, text: $text }) {
      id
    }
  }
`;

export { CREATE_COMMENT };
