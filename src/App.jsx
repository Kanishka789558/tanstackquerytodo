import React, { useState } from 'react';
import { UseTodo } from './hooks/UseTodo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddTodo } from './Api/AddTodo';
import { DeleteTodo } from './Api/DeleteTodo';
import './App.css';

const App = () => {
  const { data: todos, isLoading, isError } = UseTodo();
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();

  // Add Todo Mutation
  const addMutation = useMutation({
    mutationFn: AddTodo,
    onSuccess: (data) => {
      queryClient.setQueryData(['todos'], (oldTodos = []) => [
        ...oldTodos,
        { ...data, id: Date.now(), completed: false },
      ]);
    },
  });

  // Delete Todo Mutation
  const deleteMutation = useMutation({
    mutationFn: DeleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });


  const handleAddTodo = () => {
    if (!title.trim()) return;

    const newTodo = {
      title,
      completed: false,
      userId: 1,
    };

    addMutation.mutate(newTodo);
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
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.title}</strong> - {todo.completed ? 'yes' : 'no'}
            <button onClick={() => deleteMutation.mutate(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;



