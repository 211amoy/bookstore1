import axios from 'axios';
import ApiConfig from '@/config/api-config';
import { Author } from '@/types/author';

const jwtToken = () => localStorage.getItem('jwt-token') || '';

export const getAllAuthors = async () => {
  const response = await axios.get<{ data: Author[] }>(
    ApiConfig.GET_ALL_AUTHOR,
    {
      headers: { Authorization: jwtToken() },
    }
  );
  return response.data.data;
};

export const addAuthor = async (author: Omit<Author, 'id'>) => {
  const response = await axios.post(ApiConfig.ADD_AUTHOR, author, {
    headers: { Authorization: jwtToken() },
  });
  return response.data.data;
};

export const updateAuthor = async (id: number, author: Partial<Author>) => {
  const response = await axios.patch(
    `${ApiConfig.UPDATE_AUTHOR}/${id}`,
    author,
    {
      headers: { Authorization: jwtToken() },
    }
  );
  return response.data.data;
};

export const deleteAuthor = async (id: number) => {
  return axios.delete(`${ApiConfig.DELETE_AUTHOR}/${id}`, {
    headers: { Authorization: jwtToken() },
  });
};
