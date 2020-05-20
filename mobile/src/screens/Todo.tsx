/*eslint-disable */
import React, { FC, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { gql } from 'apollo-boost';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import { TextInput } from 'react-native-gesture-handler';
import { TODOS_QUERY } from '../queries/todo';
import { GET_COUNTER } from '../queries/counter';
import { UPDATE_COUNTER } from '../mutations/counter';
import { ADD_TODO_MUTATION, TOGGLE_TODO } from '../mutations/todo';

export const GET_ALERT_MESSAGE = gql`
  query GetRandomNumber {
    randomNumber @client
  }
`;

function AddTodo() {
  const [text, setText] = useState('');
  const [addTodo] = useMutation(ADD_TODO_MUTATION, {
    variables: { todo: { text, completed: false } },
  });

  return (
    <View>
      <TextInput
        style={{ height: 20, backgroundColor: 'red' }}
        onChange={(e) => setText(e.nativeEvent.text)}
        value={text}
      />
      <Button onPress={() => addTodo} title="ADD" />
    </View>
  );
}

function Todos() {
  const { data: { todos = [] } = {} } = useQuery(TODOS_QUERY);
  return (
    <View>
      <Text>Add TODO</Text>
      <AddTodo />
      <Text>Todos</Text>
      {todos.map((todo, index) => (
        <Todo key={index} todo={todo} />
      ))}
    </View>
  );
}

function RandomNumber() {
  const { data = {} }: any = useQuery(GET_ALERT_MESSAGE);
  const client = useApolloClient();

  return (
    <View>
      <View>
        <Button
          onPress={() => client.writeData({ data: { randomNumber: Math.random() } })}
          title="Write Random"
        />
      </View>
      <Text>{data.randomNumber}</Text>
    </View>
  );
}

function Todo({ todo = {} }: any) {
  const [toggleTodo] = useMutation(TOGGLE_TODO, { variables: { id: todo.id } });

  return (
    <View>
      <Text>{todo.text}</Text>
      <View
        style={{ height: 20, width: 20, backgroundColor: 'red' }}
        // @ts-ignore
        onChange={toggleTodo}
                // @ts-ignore
        checked={todo.completed}
      />
    </View>
  );
}

function Couter() {
  const { data } = useQuery(GET_COUNTER);
  const [increment] = useMutation(UPDATE_COUNTER, { variables: { offset: 1 } });
  const [decrement] = useMutation(UPDATE_COUNTER, { variables: { offset: -1 } });

  return (
    <View>
      <Text>Couter: {data.counter}</Text>
      <View>
        <Button onPress={() => increment()} title="Add" />
        <Button onPress={() => decrement()} title="Remove" />
      </View>
    </View>
  );
}

const TodoApp: FC = () => {
  return (
    <View style={{ paddingTop: 150 }}>
      <Todos />
      <Couter />
      <RandomNumber />
    </View>
  );
};

export default TodoApp;

/* eslint-enable */
