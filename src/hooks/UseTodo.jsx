/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import { Fetch } from '../Api/Fetch';

export const UseTodo = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: Fetch,
  });
};







