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
        shots {
          title
          content
          image
        }
      }
    }
  }
`;
