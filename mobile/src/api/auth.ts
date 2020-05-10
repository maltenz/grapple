import { gql } from 'apollo-boost';

const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(input: { name: $name, email: $email, password: $password }) {
      name
      email
    }
  }
`;

const GET_USER_BY_EMAIL = gql`
  query getUserByEmail($email: String!) {
    userByEmail(email: $email) {
      name
      email
    }
  }
`;

export { CREATE_USER, GET_USER_BY_EMAIL };
