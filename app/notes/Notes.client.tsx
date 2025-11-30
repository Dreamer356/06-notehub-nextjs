'use client';

import React from 'react';
import { Hydrate, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createNote, deleteNote, fetchNotes } from '../../lib/api';
import type { Note } from '../../types/note';
import SearchBox from '../../components/SearchBox/SearchBox';
import NoteForm from '../../components/NoteForm/NoteForm';
import NoteList from '../../components/NoteList/NoteList';

interface Props {
  dehydratedState: unknown;
}

export default function NotesClient({ dehydratedState }: Props) {
  return (
    <Hydrate state={dehydratedState}>
      <NotesInner />
    </Hydrate>
  );
}

function NotesInner() {
  const queryClient = useQueryClient();
  const [search, setSearch] = React.useState('');

  const { data: notes = [], isLoading, error } = useQuery<Note[]>(['notes'], fetchNotes);

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries(['notes']);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries(['notes']);
    },
  });

  const handleCreate = (payload: { title: string; content: string }) => {
    createMutation.mutate(payload);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Could not fetch the list of notes.</p>;

  const filtered = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <SearchBox value={search} onChange={setSearch} />
      <NoteForm onSubmit={handleCreate} />
      <NoteList notes={filtered} onDelete={handleDelete} />
    </main>
  );
}
