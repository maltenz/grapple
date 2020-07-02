import { gql } from 'apollo-boost';

const GET_POSTS = gql`
  query getPosts {
    posts {
      id
      user {
        id
        name
      }
      shots {
        id
        title
        content
        image
      }
      liked
      bookmarked
    }
  }
`;

export { GET_POSTS };
