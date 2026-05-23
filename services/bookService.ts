import axios from 'axios';
import ApiConfig from '@/config/api-config';
import { BookRequestDTO, BookResponse } from '@/types/book';

const jwtHeader = () => ({
  Authorization: localStorage.getItem('jwt-token') || '',
});

export const getAllBooks = async (): Promise<BookResponse[]> => {
  const res = await axios.get(ApiConfig.GET_ALL_BOOKS, {
    headers: jwtHeader(),
  });
  return res.data?.data ?? [];
};

export const createBook = async (
  payload: BookRequestDTO
): Promise<BookResponse> => {
  const res = await axios.post(ApiConfig.CREATE_NEW_BOOK, payload, {
    headers: jwtHeader(),
  });
  return res.data?.data;
};

export const updateBook = async (
  id: number | string,
  payload: Partial<BookRequestDTO>
): Promise<BookResponse> => {
  const res = await axios.patch(
    ApiConfig.UPDATE_BOOK_BY_ID + `/${id}`,
    payload,
    { headers: jwtHeader() }
  );
  return res.data?.data;
};

export const deleteBook = async (id: number | string) => {
  const res = await axios.delete(ApiConfig.DELETE_BOOK_BY_ID + `/${id}`, {
    headers: jwtHeader(),
  });
  return res.data.data;
};

export const uploadCoverImage = async (
  bookId: number | string,
  file: File
): Promise<BookResponse> => {
  const fd = new FormData();
  fd.append('imageFile', file);
  const res = await axios.patch(
    ApiConfig.UPLOAD_COVER_BOOK_IMAGE + `/${bookId}`,
    fd,
    { headers: { ...jwtHeader(), 'Content-Type': 'multipart/form-data' } }
  );
  return res.data?.data;
};

export const uploadBookFile = async (
  bookId: number | string,
  file: File
): Promise<BookResponse> => {
  const fd = new FormData();
  fd.append('bookFile', file);
  const res = await axios.patch(ApiConfig.UPLOAD_BOOK_FILE + `/${bookId}`, fd, {
    headers: { ...jwtHeader(), 'Content-Type': 'multipart/form-data' },
  });
  return res.data?.data;
};

export const getBookById = async (
  id: number | string
): Promise<BookResponse> => {
  const res = await axios.get(ApiConfig.GET_BOOK_BY_ID + `/${id}`, {
    headers: jwtHeader(),
  });
  return res.data?.data;
};
