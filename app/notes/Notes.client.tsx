"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, createNote, deleteNote } from "../../lib/api";
import type { Note } from "../../types/note";
import { SearchBox } from "../../components/SearchBox/SearchBox";
import { NoteList } from "../../components/NoteList/NoteList";
import { NoteForm } from "../../components/NoteForm/NoteForm";
import css from "./Notes.module.css";

export default function NotesClient() {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const {
    data: notes = [],
    isLoading,
    error,
  } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const filteredNotes = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return notes;
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(term) ||
        note.content.toLowerCase().includes(term)
    );
  }, [notes, search]);

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) {
    return (
      <p>Could not fetch the list of notes.</p>
    );
  }

  return (
    <div className={css.container}>
      <h1 className={css.title}>Notes</h1>
      <SearchBox value={search} onChange={setSearch} />
      <div className={css.layout}>
        <section className={css.formSection}>
          <h2 className={css.sectionTitle}>Create a new note</h2>
          <NoteForm onSubmit={(data) => createMutation.mutate(data)} />
        </section>
        <section className={css.listSection}>
          <h2 className={css.sectionTitle}>Your notes</h2>
          {filteredNotes.length === 0 ? (
            <p>No notes found.</p>
          ) : (
            <NoteList
              notes={filteredNotes}
              onDelete={(id) => deleteMutation.mutate(id)}
            />
          )}
        </section>
      </div>
    </div>
  );
}
