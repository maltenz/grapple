import { gql } from 'apollo-boost';

const GET_USER_BY_EMAIL = gql`
  query getUserByEmail($email: String!) {
    userByEmail(email: $email) {
      name
      email
    }
  }
`;

export { GET_USER_BY_EMAIL };
