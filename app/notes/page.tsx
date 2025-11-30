import { QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api';
import NotesClient from './Notes.client';

export const revalidate = 0;

export default async function NotesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['notes'], fetchNotes);
  const dehydratedState = dehydrate(queryClient);

  return <NotesClient dehydratedState={dehydratedState} />;
}
