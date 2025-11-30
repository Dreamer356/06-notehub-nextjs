'use client';

import React from 'react';
import styles from './NoteForm.module.css';

interface Props {
  onSubmit: (data: { title: string; content: string }) => void;
}

export default function NoteForm({ onSubmit }: Props) {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        className={styles.input}
      />
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Content"
        className={styles.textarea}
      />
      <button type="submit" className={styles.button}>
        Add note
      </button>
    </form>
  );
}
