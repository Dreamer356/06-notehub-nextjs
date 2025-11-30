'use client';

import styles from './SearchBox.module.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: Props) {
  return (
    <div className={styles.container}>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search notes..."
        className={styles.input}
      />
    </div>
  );
}
