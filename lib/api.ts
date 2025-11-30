import axios from 'axios';
import { Note } from '../types/note';

const BASE_URL = process.env.NEXT_PUBLIC_NOTEHUB_BASE_URL || 'https://notehub-api.fly.dev';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN || '';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : undefined,
    'Content-Type': 'application/json',
  },
});

export const fetchNotes = async (): Promise<Note[]> => {
  const resp = await api.get('/notes');
  return resp.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const resp = await api.get(`/notes/${id}`);
  return resp.data;
};

export const createNote = async (note: Partial<Note>): Promise<Note> => {
  const resp = await api.post('/notes', note);
  return resp.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
