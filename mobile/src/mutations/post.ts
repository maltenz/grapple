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
      liked
      bookmarked
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

const UNLIKE_POST = gql`
  mutation unlikePost($id: String!) {
    unlikePost(id: $id) {
      id
    }
  }
`;

const BOOKMARK_POST = gql`
  mutation bookmarkPost($id: String!) {
    bookmarkPost(id: $id) {
      id
    }
  }
`;

const REMOVE_BOOKMARK_POST = gql`
  mutation removeBookmarkPost($id: String!) {
    removeBookmarkPost(id: $id) {
      id
    }
  }
`;

export { CREATE_POST, LIKE_POST, UNLIKE_POST, BOOKMARK_POST, REMOVE_BOOKMARK_POST };
