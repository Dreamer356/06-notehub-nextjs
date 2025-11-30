import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import HydrateClient from "../../components/TanStackProvider/HydrateClient";
import NotesClient from "./Notes.client";

export default async function Page() {
  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  const dehydratedState = dehydrate(qc);

  return (
    <HydrateClient state={dehydratedState}>
      <NotesClient />
    </HydrateClient>
  );
}
