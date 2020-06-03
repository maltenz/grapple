import { gql } from 'apollo-boost';

const CREATE_POST = gql`
  mutation createPost($shots: [ShotInput!]!) {
    createPost(input: { shots: $shots }) {
      id
      user {
        name
      }
      shots {
        id
        image
        title
        content
      }
    }
  }
`;

export { CREATE_POST };
