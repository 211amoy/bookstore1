import axios from 'axios';
import ApiConfig from '@/config/api-config';
import { User } from '@/types/user';

const jwtToken = () => localStorage.getItem('jwt-token') || '';

export const getAllUsers = async (): Promise<User[]> => {
  const response = await axios.get(ApiConfig.GET_ALL_USERS, {
    headers: { Authorization: jwtToken() },
  });
  return response.data.data || [];
};

export const deleteUser = async (email: string): Promise<void> => {
  await axios.delete(`${ApiConfig.DELETE_USER}/${email}`, {
    headers: { Authorization: jwtToken() },
  });
};
