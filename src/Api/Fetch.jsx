
import axios from 'axios';

export const Fetch = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
  return res.data;
};

