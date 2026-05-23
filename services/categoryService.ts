import axios from 'axios';
import ApiConfig from '@/config/api-config';
import { Category } from '@/types/category';

const jwtToken = () => localStorage.getItem('jwt-token') || '';

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await axios.get(ApiConfig.GET_ALL_CATEGORY, {
    headers: { Authorization: jwtToken() },
  });
  return response.data.data || [];
};

export const createCategory = async (data: {
  name: string;
  description: string;
}) => {
  const response = await axios.post(ApiConfig.CREATE_CATEGORY, data, {
    headers: { Authorization: jwtToken() },
  });
  return response.data.data;
};

export const updateCategory = async (id: number, data: Category) => {
  const response = await axios.patch(
    `${ApiConfig.UPDATE_CATEGORY}/${id}`,
    data,
    {
      headers: { Authorization: jwtToken() },
    }
  );
  return response.data.data;
};

export const deleteCategory = async (id: number) => {
  await axios.delete(`${ApiConfig.DELETE_CATEGORY}/${id}`, {
    headers: { Authorization: jwtToken() },
  });
};
