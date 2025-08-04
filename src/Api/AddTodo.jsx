import axios from 'axios';

export const AddTodo = async (newTodo) => {
  const res = await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo);
  return res.data;
}