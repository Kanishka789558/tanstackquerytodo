// import React, { useState } from 'react';
// import { UseTodo } from './hooks/UseTodo';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { AddTodo } from './Api/AddTodo';
// import { DeleteTodo } from './Api/DeleteTodo';
// import './App.css';

// const App = () => {
//   const { data: todos, isLoading, isError } = UseTodo();
//   const [title, setTitle] = useState('');
//   const queryClient = useQueryClient();

//   // Add Todo Mutation
//   const addMutation = useMutation({
//     mutationFn: AddTodo,
//     onSuccess: (data) => {
//       queryClient.setQueryData(['todos'], (oldTodos = []) => [
//         ...oldTodos,
//         { ...data, id: Date.now(), completed: false },
//       ]);
//     },
//   });

//   // Delete Todo Mutation
//   const deleteMutation = useMutation({
//     mutationFn: DeleteTodo,
//     onSuccess: () => {
//       queryClient.invalidateQueries(['todos']);
//     },
//   });


//   const handleAddTodo = () => {
//     if (!title.trim()) return;

//     const newTodo = {
//       title,
//       completed: false,
//       userId: 1,
//     };

//     addMutation.mutate(newTodo);
//     setTitle('');
//   };

//   if (isLoading) return <h2>Loading...</h2>;
//   if (isError) return <h2>Error fetching todos.</h2>;

//   return (
//     <div className="app">
//       <h1>TanStack Query Todo App</h1>

//       <div style={{ marginBottom: '1rem' }}>
//         <input
//           type="text"
//           placeholder="New Todo"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <button onClick={handleAddTodo}>Add Todo</button>
//       </div>

//       <ul>
//         {todos?.map((todo) => (
//           <li key={todo.id}>
//             <strong>{todo.title}</strong> - {todo.completed ? 'yes' : 'no'}
//             <button onClick={() => deleteMutation.mutate(todo.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;


// import React, { useState } from 'react';
// import { UseTodo } from './hooks/UseTodo';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { AddTodo } from './Api/AddTodo';
// import { DeleteTodo } from './Api/DeleteTodo';
// import { EditTodo } from './Api/EditTodo'; // New import
// import './App.css';

// const App = () => {
//   const { data: todos, isLoading, isError } = UseTodo();
//   const [title, setTitle] = useState('');
//   const [editId, setEditId] = useState(null);
//   const [editTitle, setEditTitle] = useState('');
//   const queryClient = useQueryClient();

//   const addMutation = useMutation({
//     mutationFn: AddTodo,
//     onSuccess: (data) => {
//       queryClient.setQueryData(['todos'], (oldTodos = []) => [
//         ...oldTodos,
//         { ...data, id: Date.now(), completed: false },
//       ]);
//     },
//   });

//   const deleteMutation = useMutation({
//     mutationFn: DeleteTodo,
//     onSuccess: () => {
//       queryClient.invalidateQueries(['todos']);
//     },
//   });

//   const editMutation = useMutation({
//     mutationFn: EditTodo,
//     onSuccess: () => {
//       queryClient.invalidateQueries(['todos']);
//       setEditId(null);
//       setEditTitle('');
//     },
//   });

//   const handleAddTodo = () => {
//     if (!title.trim()) return;
//     const newTodo = {
//       title,
//       completed: false,
//       userId: 1,
//     };
//     addMutation.mutate(newTodo);
//     setTitle('');
//   };

//   const handleEditSave = (id) => {
//     if (!editTitle.trim()) return;
//     const updatedData = {
//       title: editTitle,
//       completed: false,
//       userId: 1,
//     };
//     editMutation.mutate({ id, updatedData });
//   };

//   if (isLoading) return <h2>Loading...</h2>;
//   if (isError) return <h2>Error fetching todos.</h2>;

//   return (
//     <div className="app">
//       <h1>TanStack Query Todo App</h1>

//       <div style={{ marginBottom: '1rem' }}>
//         <input
//           type="text"
//           placeholder="New Todo"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <button onClick={handleAddTodo}>Add Todo</button>
//       </div>

//       <ul>
//         {todos?.map((todo) => (
//           <li key={todo.id}>
//             {editId === todo.id ? (
//               <>
//                 <input
//                   type="text"
//                   value={editTitle}
//                   onChange={(e) => setEditTitle(e.target.value)}
//                 />
//                 <button onClick={() => handleEditSave(todo.id)}>Save</button>
//                 <button onClick={() => setEditId(null)}>Cancel</button>
//               </>
//             ) : (
//               <>
//                 <strong>{todo.title}</strong> - {todo.completed ? 'yes' : 'no'}
//                 <button onClick={() => {
//                   setEditId(todo.id);
//                   setEditTitle(todo.title);
//                 }}>Edit</button>
//                 <button onClick={() => deleteMutation.mutate(todo.id)}>Delete</button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react';
import { UseTodo } from './hooks/UseTodo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddTodo } from './Api/AddTodo';
import { DeleteTodo } from './Api/DeleteTodo';
import { EditTodo } from './Api/EditTodo';
import './App.css';

const App = () => {
  const { data: apiTodos = [], isLoading, isError } = UseTodo();
  const [localTodos, setLocalTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const queryClient = useQueryClient();

  // Add Todo (local only)
  const handleAddTodo = () => {
    if (!title.trim()) return;
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
      userId: 1,
      local: true,
    };
    setLocalTodos((prev) => [...prev, newTodo]);
    setTitle('');
  };

  // Edit Todo
  const handleEditSave = (id) => {
    if (!editTitle.trim()) return;

    const isLocal = localTodos.find((t) => t.id === id);

    if (isLocal) {
      setLocalTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, title: editTitle } : todo
        )
      );
    } else {
      const updatedData = {
        title: editTitle,
        completed: false,
        userId: 1,
      };
      editMutation.mutate({ id, updatedData });
    }

    setEditId(null);
    setEditTitle('');
  };

  // Edit Mutation (for API todos)
  const editMutation = useMutation({
    mutationFn: EditTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  // Delete Mutation (for API todos)
  const deleteMutation = useMutation({
    mutationFn: DeleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  // Delete Todo (local or API)
  const handleDelete = (id) => {
    const isLocal = localTodos.find((t) => t.id === id);
    if (isLocal) {
      setLocalTodos((prev) => prev.filter((todo) => todo.id !== id));
    } else {
      deleteMutation.mutate(id);
    }
  };

  const allTodos = [...apiTodos, ...localTodos];

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
        {allTodos.map((todo) => (
          <li key={todo.id}>
            {editId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <div className="btn-group">
                  <button onClick={() => handleEditSave(todo.id)}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <span>
                  <strong>{todo.title}</strong> - {todo.completed ? 'yes' : 'no'}
                </span>
                <div className="btn-group">
                  <button
                    onClick={() => {
                      setEditId(todo.id);
                      setEditTitle(todo.title);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(todo.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
