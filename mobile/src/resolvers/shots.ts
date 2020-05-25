/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any,  no-shadow, array-callback-return  */
import { remove } from 'lodash';
import gql from 'graphql-tag';
import { Shot } from '../generated/graphql';

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

export const DELETE_SHOT = gql`
  mutation DeleteShot($id: String) {
    deleteShot(input: { id: $id }) @client
  }
`;

const query = gql`
  query GetShots {
    shots @client(always: true) {
      id
      title
      content
      image
    }
  }
`;

function addShot(_: any, { input: { id, title, content, image } }: any, { cache }: any): any {
  const all = cache.readQuery({ query });

  const newShot = { id, title, content, image, __typename: 'TodoItem' };
  const data = {
    shots: [...all.shots, newShot],
  };

  cache.writeQuery({ query, data });
  return newShot;
}

function deleteShot(_: any, { input: { id } }: any, { cache }: any): any {
  const { shots } = cache.readQuery({ query });

  const newShots = [...shots];

  newShots.map((shot: Shot, index: number): void => {
    if (shot.id === id) {
      newShots.splice(index, 1);
    }
  });

  const data = {
    shots: newShots,
  };

  cache.writeQuery({ query, data });
  return data;
}

export { addShot, deleteShot };
