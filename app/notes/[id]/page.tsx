import React from 'react';
import NoteDetailsClient from './NoteDetails.client';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';

type Params = { params: { id: string } };

export const revalidate = 0;

export default async function NotePage({ params }: Params) {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['note', id], () => fetchNoteById(id));
  const dehydratedState = dehydrate(queryClient);

  return <NoteDetailsClient dehydratedState={dehydratedState} />;
}
