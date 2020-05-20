import { gql } from 'apollo-boost';

const GET_POSTS = gql`
  query getPosts {
    posts {
      id
      user {
        name
      }
      shots {
        title
        content
        image
      }
    }
  }
`;

export { GET_POSTS };
