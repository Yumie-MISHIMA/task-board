import { useEffect, useRef, useState } from 'react';
import { STORAGE_KEY, loadTasks, saveTasks } from './taskStorage.js';

// localStorage と同期するタスク一覧の state
export default function useStoredTasks() {
  const [tasks, setTasks] = useState(loadTasks);
  // 最後に保存した（または読み込んだ）内容。同じ内容は書き込まない。
  // これにより、起動直後に読み込み結果で元データを上書きすることがなくなる
  const lastSavedRef = useRef(null);
  if (lastSavedRef.current === null) {
    lastSavedRef.current = JSON.stringify(tasks);
  }

  useEffect(() => {
    const json = JSON.stringify(tasks);
    if (json === lastSavedRef.current) return;
    saveTasks(json);
    lastSavedRef.current = json;
  }, [tasks]);

  // 別タブでの変更を取り込み、こちらの古い内容で上書きしないようにする
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== STORAGE_KEY && event.key !== null) return;
      const next = loadTasks();
      lastSavedRef.current = JSON.stringify(next);
      setTasks(next);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return [tasks, setTasks];
}
