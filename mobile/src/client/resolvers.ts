import { InMemoryCache, gql } from 'apollo-boost';
import updateSignUser from '../resolvers/updateSignUser';
import updateShot from '../resolvers/updateShot';
import updatePager from '../resolvers/updatePager';
import updatePullModal from '../resolvers/updatePullModal';
import { GetTodosQuery, GetTodosDocument } from '../generated/graphql';

const nextTodoId = 0;

export const resolvers = {
  Mutation: {
    updateSignUser,
    updateShot,
    updatePager,
    updatePullModal,
    updateTodos: (_, { input: { text, completed } }, { cache }) => {
      console.log('update');
      const query = gql`
        query GetTodos {
          todos @client {
            id
            text
            completed
          }
        }
      `;

      console.log('text');
      console.log(text);
      console.log(completed);

      const previous = cache.readQuery({ query });
      const newTodo = { id: nextTodoId++, text, completed: false, __typename: 'TodoItem' };
      const data = {
        todos: [...previous.todos, newTodo],
      };

      // you can also do cache.writeData({ data }) here if you prefer
      cache.writeQuery({ query, data });
      return newTodo;
    },
  },
};
