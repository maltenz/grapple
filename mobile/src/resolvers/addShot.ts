/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import gql from 'graphql-tag';

export const ADD_SHOT = gql`
  mutation AddShots($id: ID!, $title: String, $content: String, $image: String) {
    addShot(input: { id: $id, title: $title, content: $content, image: $image }) @client
  }
`;

export const GET_SHOTS = gql`
  {
    shots @client {
      id
      title
      content
      image
    }
  }
`;

export default function addShot(
  _: any,
  { input: { id, title, content, image } }: any,
  { cache }: any
): any {
  const query = gql`
    query GetShots {
      shots @client {
        id
        title
        content
        image
      }
    }
  `;

  const previous = cache.readQuery({ query });

  const newTodo = { id, title, content, image, __typename: 'TodoItem' };
  const data = {
    shots: [...previous.shots, newTodo],
  };

  cache.writeQuery({ query, data });
  return newTodo;
}
