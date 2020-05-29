/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-ignore */
import gql from 'graphql-tag';
import { Shot } from '../generated/graphql';

export const ADD_SHOT = gql`
  mutation AddShot($id: ID!, $title: String, $content: String, $image: String) {
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

export const UPDATE_SHOT = gql`
  mutation UpdateShot($id: ID!, $title: String, $content: String, $image: String) {
    updateShot(input: { id: $id, title: $title, content: $content, image: $image }) @client
  }
`;

export const DELETE_SHOT = gql`
  mutation DeleteShot($id: String) {
    deleteShot(input: { id: $id }) @client
  }
`;

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

function addShot(_: any, { input: { id, title, content, image } }: any, { cache }: any): any {
  const all = cache.readQuery({ query });

  const newShot = { id, title, content, image, __typename: 'StateShot' };
  const data = {
    shots: [...all.shots, newShot],
  };

  cache.writeQuery({ query, data });
  return newShot;
}

function updateShot(_: any, { input: { id, title, content, image } }: any, { cache }: any): any {
  const { shots } = cache.readQuery({ query });

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

    cache.writeQuery({ query, data });
    return data;
  });

  return returnShots[0];
}

function deleteShot(_: any, { input: { id } }: any, { cache }: any): any {
  const { shots } = cache.readQuery({ query });

  const newShots = [...shots];

  // eslint-disable-next-line array-callback-return
  newShots.map((shot: Shot, index: number) => {
    if (shot.id === id) {
      newShots.splice(index, 1);
    }
  });

  const data = {
    shots: [...newShots],
  };

  cache.writeQuery({ query, data });
  return data;
}

export { addShot, updateShot, deleteShot };
