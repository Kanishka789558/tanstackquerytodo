import axios from 'axios';

export const EditTodo = async ({ id, updatedData }) => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, updatedData);
  return response.data;
};
