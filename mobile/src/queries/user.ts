import { gql } from 'apollo-boost';

const GET_USER_BY_EMAIL = gql`
  query getUserByEmail($email: String!) {
    userByEmail(email: $email) {
      name
      email
    }
  }
`;

const GET_USER_POSTS = gql`
  query getUserPosts($id: String!) {
    userPosts(id: $id) {
      shots {
        image
        title
        content
      }
    }
  }
`;

const GET_USER_POSTS_LIKED = gql`
  query getUserPostsLiked($id: String!) {
    userLiked(id: $id) {
      id
    }
  }
`;

export { GET_USER_BY_EMAIL, GET_USER_POSTS, GET_USER_POSTS_LIKED };
