import React from 'react';
import NotesClient from './Notes.client';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api';

export const revalidate = 0;

export default async function NotesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['notes'], fetchNotes);
  const dehydratedState = dehydrate(queryClient);

  return (
    <div style={{ padding: 16 }}>
      <NotesClient dehydratedState={dehydratedState} />
    </div>
  );
}
