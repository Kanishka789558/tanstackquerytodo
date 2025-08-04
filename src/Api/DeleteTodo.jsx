import axios from 'axios';



export const DeleteTodo = async (id) => {
  const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return response.data;
};
