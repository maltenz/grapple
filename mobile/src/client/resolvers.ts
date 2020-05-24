/* eslint-disable @typescript-eslint/ban-ts-ignore, @typescript-eslint/explicit-function-return-type */
import { gql } from 'apollo-boost';
import updateSignUser from '../resolvers/updateSignUser';
import updateShot from '../resolvers/updateShot';
import updatePager from '../resolvers/updatePager';
import updatePullModal from '../resolvers/updatePullModal';

export const resolvers = {
  Mutation: {
    updateSignUser,
    updateShot,
    updatePager,
    updatePullModal,
    // @ts-ignore
    updateTodos: (_, { input: { id, title, content, image } }, { cache }) => {
      console.log(title);
      console.log(content);
      const query = gql`
        query GetTodos {
          todos @client {
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
        todos: [...previous.todos, newTodo],
      };

      cache.writeQuery({ query, data });
      return newTodo;
    },
  },
};
