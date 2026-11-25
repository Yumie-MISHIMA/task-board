import { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = title.trim();
    // 空白だけの入力はタスクとして追加しない
    if (!trimmed) return;
    onAdd(trimmed);
    setTitle('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="新しいタスクを入力"
        aria-label="新しいタスク"
        maxLength={200}
      />
      <button type="submit" disabled={!title.trim()}>
        追加
      </button>
    </form>
  );
}
