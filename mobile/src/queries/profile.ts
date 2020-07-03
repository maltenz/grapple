import { gql } from 'apollo-boost';

export const GET_PROFILE = gql`
  query getAuthProfile {
    getAuthProfile {
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
        }
      }
    }
  }
`;
