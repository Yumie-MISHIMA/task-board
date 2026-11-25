import { useState } from 'react';
import TaskForm from './components/TaskForm.jsx';
import TaskItem from './components/TaskItem.jsx';

export default function App() {
  // タスク一覧の状態はここで一元管理する（永続化はしない）
  const [tasks, setTasks] = useState([]);

  const addTask = (title) => {
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, completed: false },
    ]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const remaining = tasks.filter((task) => !task.completed).length;

  return (
    <main className="board">
      <h1>タスクボード</h1>
      <TaskForm onAdd={addTask} />

      {tasks.length === 0 ? (
        <p className="empty">タスクはまだありません。</p>
      ) : (
        <>
          <ul className="task-list">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </ul>
          <p className="summary">
            未完了 {remaining} 件 / 全 {tasks.length} 件
          </p>
        </>
      )}
    </main>
  );
}
