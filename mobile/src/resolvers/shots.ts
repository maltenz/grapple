/* eslint-disable no-shadow, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import gql from 'graphql-tag';
import arrayMove from 'array-move';
import { Shot } from '../generated/graphql';

export const ADD_SHOT = gql`
  mutation AddShot($id: ID!, $title: String, $content: String, $image: String) {
    addShot(input: { id: $id, title: $title, content: $content, image: $image }) @client
  }
`;

export const GET_SHOTS = gql`
  {
    shots @client(always: true, returnPartial: true) {
      id
      title
      content
      image
    }
  }
`;

export const MOVE_UP_SHOT = gql`
  mutation MoveUpShot($id: ID!) {
    moveUpShot(input: { id: $id }) @client
  }
`;

export const UPDATE_SHOT = gql`
  mutation UpdateShot($id: ID!, $title: String, $content: String, $image: String) {
    updateShot(input: { id: $id, title: $title, content: $content, image: $image })
      @client(always: true)
  }
`;

export const DELETE_SHOT = gql`
  mutation DeleteShot($id: String) {
    deleteShot(input: { id: $id }) @client
  }
`;

export const query = gql`
  query GetShots {
    shots @client(always: true) {
      id
      title
      content
      image
    }
  }
`;

function addShot(_: any, { input: { id, title, content, image } }: any, { client }: any): any {
  const all = client.cache.readQuery({ query });

  const newShot = { id, title, content, image, __typename: 'StateShot' };
  const data = {
    shots: [...all.shots, newShot],
  };

  client.writeQuery({ query, data, variables: { id, title, content, image } });
  return newShot;
}

function updateShot(_: any, { input: { id, title, content, image } }: any, { client }: any): any {
  const { shots } = client.cache.readQuery({ query });

  const newShots = [...shots];
  let newShot: Shot;
  let data;

  const returnShots = newShots.map((shot: Shot, index: number): any => {
    if (shot.id === id) {
      newShot = {
        id: shot.id,
        image: shot.image,
        title: shot.title,
        content: shot.content,
        // @ts-ignore
        __typename: 'StateShot',
      };

      if (title || title === '') {
        newShot.title = title;
      }

      if (content || content === '') {
        newShot.content = content;
      }

      if (image || image === '') {
        newShot.image = image;
      }

      newShots.splice(index, 1);

      data = {
        shots: [...newShots, newShot],
      };
    } else {
      data = {
        shots: [...shots],
      };
    }

    client.writeQuery({ query, data, variables: { id, title, content, image } });
    return data;
  });

  return returnShots[0];
}

function deleteShot(_: any, { input: { id } }: any, { client }: any): any {
  const { shots } = client.cache.readQuery({ query });

  const newShots = [...shots];

  newShots.map((shot: Shot, index: number) => {
    if (shot.id === id) {
      newShots.splice(index, 1);
    }
    return null;
  });

  const data = {
    shots: [...newShots],
  };

  client.writeQuery({ query, data });
  return data;
}

function moveUpShot(_: any, { input: { id } }: any, { client }: any): any {
  const { shots } = client.cache.readQuery({ query });

  const newShots = [...shots];

  newShots.map((shot: Shot, index: number) => {
    if (shot.id === id) {
      const movedArray = arrayMove(newShots, index, index - 1);

      const data = {
        shots: [...movedArray],
      };

      client.writeQuery({ query, data });

      return data;
    }

    const data = {
      shots,
    };

    client.writeQuery({ query, data });

    return data;
  });
}

export { addShot, updateShot, deleteShot, moveUpShot };
