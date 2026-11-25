const STORAGE_KEY = 'task-board:tasks';

// 保存データは手で書き換えられる可能性があるため、形が正しい要素だけを採用する
const isValidTask = (task) =>
  task !== null &&
  typeof task === 'object' &&
  typeof task.id === 'string' &&
  typeof task.title === 'string' &&
  typeof task.completed === 'boolean';

export function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isValidTask) : [];
  } catch {
    // プライベートモードなどで localStorage が使えない、または JSON が壊れている場合は空で始める
    return [];
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // 容量超過・ストレージ無効時は保存を諦める（画面上の操作は続けられる）
  }
}
