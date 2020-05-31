import { gql } from 'apollo-boost';

const CREATE_POST = gql`
  mutation createPost($shots: [ShotInput!]!) {
    createPost(input: { shots: $shots }) {
      id
      shots {
        id
      }
    }
  }
`;

export { CREATE_POST };
