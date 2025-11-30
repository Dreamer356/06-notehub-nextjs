import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import { HydrateClient } from "../../components/TanStackProvider/TanStackProvider";
import NotesClient from "./Notes.client";

export const revalidate = 0;

export default async function NotesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateClient state={dehydratedState}>
      <NotesClient />
    </HydrateClient>
  );
}
