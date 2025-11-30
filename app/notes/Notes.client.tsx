'use client';
import React from 'react';
import { QueryClient, useQuery, Hydrate } from '@tanstack/react-query';
import { fetchNotes, deleteNote } from '../../lib/api';
import Link from 'next/link';

type Props = {
  dehydratedState?: unknown;
};

export default function NotesClient({ dehydratedState }: Props) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <Hydrate state={dehydratedState}>
      <Inner />
    </Hydrate>
  );
}

function Inner() {
  const { data: notes, isLoading, error } = useQuery(['notes'], fetchNotes);

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Could not fetch the list of notes.</p>;
  if (!notes || notes.length === 0) return <p>No notes found.</p>;

  return (
    <div>
      <h2>Notes</h2>
      <Link href="/notes/new">Create note</Link>
      <ul>
        {notes.map((n: any) => (
          <li key={n.id}>
            <h3>{n.title}</h3>
            <p>{n.content}</p>
            <Link href={`/notes/${n.id}`}>View details</Link>{' '}
            <button onClick={async () => { await deleteNote(n.id); location.reload(); }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
