import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const BASE_URL =
  process.env.NEXT_PUBLIC_NOTEHUB_BASE_URL || "https://notehub-public.goit.study/api";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const noteApi = axios.create({
  baseURL: BASE_URL,
  headers: token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : undefined,
});

export interface FetchNotesParams {
  search?: string;
}

export async function fetchNotes(): Promise<Note[]> {
  const response = await noteApi.get<Note[]>("/notes");
  return response.data;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export async function createNote(data: CreateNoteParams): Promise<Note> {
  const response = await noteApi.post<Note>("/notes", data);
  return response.data;
}

export interface DeleteNoteResponse {
  id: string;
}

export async function deleteNote(id: string): Promise<DeleteNoteResponse> {
  const response = await noteApi.delete<DeleteNoteResponse>(`/notes/${id}`);
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await noteApi.get<Note>(`/notes/${id}`);
  return response.data;
}
