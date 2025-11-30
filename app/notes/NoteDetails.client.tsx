'use client';
import React from 'react';
import { QueryClient, useQuery, Hydrate } from '@tanstack/react-query';
import { fetchNoteById } from '../../lib/api';
import { useParams } from 'next/navigation';

export default function NoteDetailsClient({ dehydratedState }: { dehydratedState?: unknown }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <Hydrate state={dehydratedState}>
      <Inner />
    </Hydrate>
  );
}

function Inner() {
  const params = useParams();
  const id = params?.id || '';
  const { data: note, isLoading, error } = useQuery(['note', id], () => fetchNoteById(id), { enabled: !!id });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div style={{ padding: 16 }}>
      <div>
        <div>
          <h2>{note.title}</h2>
        </div>
        <p>{note.content}</p>
        <p>{note.createdAt || note.date || ''}</p>
      </div>
    </div>
  );
}
