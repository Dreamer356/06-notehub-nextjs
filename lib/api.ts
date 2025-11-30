import axios from 'axios';
import type { Note } from '../types/note';

const BASE_URL =
  process.env.NEXT_PUBLIC_NOTEHUB_BASE_URL || 'https://notehub-public.goit.study/api';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : undefined,
});

export const fetchNotes = async (): Promise<Note[]> => {
  const { data } = await api.get<Note[]>('/notes');
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (payload: Pick<Note, 'title' | 'content'>): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', payload);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
