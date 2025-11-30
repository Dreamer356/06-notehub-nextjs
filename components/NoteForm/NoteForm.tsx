"use client";

import { useState } from "react";
import type { NoteTag } from "../../types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onSubmit: (data: { title: string; content: string; tag: NoteTag }) => void;
}

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export const NoteForm = ({ onSubmit }: NoteFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<NoteTag>("Todo");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit({ title: title.trim(), content: content.trim(), tag });
    setTitle("");
    setContent("");
    setTag("Todo");
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.fieldGroup}>
        <label className={css.label}>
          Title
          <input
            className={css.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
      </div>
      <div className={css.fieldGroup}>
        <label className={css.label}>
          Content
          <textarea
            className={css.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
      </div>
      <div className={css.fieldGroup}>
        <label className={css.label}>
          Tag
          <select
            className={css.select}
            value={tag}
            onChange={(e) => setTag(e.target.value as NoteTag)}
          >
            {TAGS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button className={css.button} type="submit">
        Add note
      </button>
    </form>
  );
};
