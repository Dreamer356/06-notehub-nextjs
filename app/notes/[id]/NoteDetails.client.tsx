'use client';

import React from 'react';
import { Hydrate, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '../../../lib/api';
import type { Note } from '../../../types/note';
import styles from './NoteDetails.module.css';

interface Props {
  dehydratedState: unknown;
}

export default function NoteDetailsClient({ dehydratedState }: Props) {
  return (
    <Hydrate state={dehydratedState}>
      <NoteDetailsInner />
    </Hydrate>
  );
}

function NoteDetailsInner() {
  const params = useParams();
  const id = params?.id as string | undefined;

  const { data: note, isLoading, error } = useQuery<Note | undefined>(
    ['note', id],
    () => fetchNoteById(id as string),
    { enabled: !!id }
  );

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={styles.content}>{note.content}</p>
        <p className={styles.date}>
          {note.createdAt ? new Date(note.createdAt).toLocaleString() : ''}
        </p>
      </div>
    </div>
  );
}
