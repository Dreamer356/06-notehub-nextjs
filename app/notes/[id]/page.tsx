import { QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface Params {
  params: { id: string };
}

export const revalidate = 0;

export default async function NoteDetailsPage({ params }: Params) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['note', params.id], () => fetchNoteById(params.id));
  const dehydratedState = dehydrate(queryClient);

  return <NoteDetailsClient dehydratedState={dehydratedState} />;
}
