import { gql } from 'apollo-boost';

export const AUTH_PROFILE = gql`
  query authProfile {
    authProfile {
      user {
        name
        id
      }
      bio
      phone
      location
      active
      posts {
        id
        shots {
          title
          content
          image
        }
      }
    }
  }
`;
