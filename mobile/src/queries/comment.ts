import { gql } from 'apollo-boost';

const GET_COMMENTS = gql`
  query getComments($id: String!) {
    comments(id: $id) {
      id
      text
      user {
        name
      }
    }
  }
`;

export { GET_COMMENTS };
