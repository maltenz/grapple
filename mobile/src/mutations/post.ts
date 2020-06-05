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

const LIKE_POST = gql`
  mutation likePost($id: String!) {
    likePost(id: $id) {
      id
    }
  }
`;

export { CREATE_POST, LIKE_POST };
