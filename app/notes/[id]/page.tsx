import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import { HydrateClient } from "../../../components/TanStackProvider/TanStackProvider";
import NoteDetailsClient from "./NoteDetails.client";

interface NotePageProps {
  params: { id: string };
}

export const revalidate = 0;

export default async function NotePage({ params }: NotePageProps) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(params.id),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateClient state={dehydratedState}>
      <NoteDetailsClient />
    </HydrateClient>
  );
}
