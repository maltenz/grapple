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
    updateTodos: (_, { input: { id, text, completed } }, { cache }) => {
      const query = gql`
        query GetTodos {
          todos @client {
            id
            text
            completed
          }
        }
      `;

      const previous = cache.readQuery({ query });

      const newTodo = { id, text, completed, __typename: 'TodoItem' };
      const data = {
        todos: [...previous.todos, newTodo],
      };

      cache.writeQuery({ query, data });
      return newTodo;
    },
  },
};
