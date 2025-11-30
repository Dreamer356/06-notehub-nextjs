'use client';

import Link from 'next/link';
import styles from './NoteList.module.css';
import type { Note } from '../../types/note';

interface Props {
  notes: Note[];
  onDelete: (id: string) => void;
}

export default function NoteList({ notes, onDelete }: Props) {
  if (notes.length === 0) {
    return <p>No notes found.</p>;
  }

  return (
    <ul className={styles.list}>
      {notes.map(note => (
        <li key={note.id} className={styles.item}>
          <h3 className={styles.title}>{note.title}</h3>
          <p className={styles.content}>{note.content}</p>
          <div className={styles.actions}>
            <Link href={`/notes/${note.id}`} className={styles.link}>
              View details
            </Link>
            <button
              type="button"
              className={styles.button}
              onClick={() => onDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
