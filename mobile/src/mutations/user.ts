import { gql } from 'apollo-boost';

const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(input: { name: $name, email: $email, password: $password }) {
      name
      email
    }
  }
`;

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password }) {
      token
      id
      name
      email
    }
  }
`;

export { CREATE_USER, LOGIN_USER };
