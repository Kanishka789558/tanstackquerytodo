


import React, { useState } from 'react';
import { UseTodo } from './hooks/UseTodo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddTodo } from './Api/AddTodo';
import "./App.css"

const App = () => {
  const { data: todos, isLoading, isError } = UseTodo();
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();

  //  Add Todo Mutation
  const mutation = useMutation({
    mutationFn: AddTodo,
    onSuccess: (data) => {
      // Option 1: Refetch todos
      // queryClient.invalidateQueries(['todos']);

      //  Option 2: Optimistically update
      queryClient.setQueryData(['todos'], (oldTodos) => [
        ...oldTodos,
        { ...data, id: Date.now(), completed: false },
      ]);
    },
  });

  const handleAddTodo = () => {
    if (!title.trim()) return;

    const newTodo = {
      title,
      completed: false,
      userId: 1,
    };

    mutation.mutate(newTodo);
    setTitle('');
  };

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error fetching todos.</h2>;

  return (
    <div className="app">
      <h1>TanStack Query Todo App</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="New Todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '0.5rem', width: '60%' }}
        />
        <button onClick={handleAddTodo} style={{ padding: '0.5rem', marginLeft: '0.5rem' }}>
          Add Todo
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.title}</strong> - {todo.completed ? 'yes' : 'no'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

