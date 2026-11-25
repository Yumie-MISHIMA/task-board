export const STORAGE_KEY = 'task-board:tasks';
// 読み込めなかった（または一部を捨てた）元データの退避先。手動復旧用
const BACKUP_KEY = 'task-board:tasks:backup';

// 保存データは手で書き換えられる可能性があるため、形が正しい要素だけを採用する
const isValidTask = (task) =>
  task !== null &&
  typeof task === 'object' &&
  typeof task.id === 'string' &&
  typeof task.title === 'string' &&
  typeof task.completed === 'boolean';

function backupRaw(raw) {
  try {
    localStorage.setItem(BACKUP_KEY, raw);
  } catch {
    // 退避できなくても読み込み自体は続ける
  }
}

// 形が正しく、id が重複しない要素だけを残す
function sanitize(parsed) {
  if (!Array.isArray(parsed)) return [];
  const seenIds = new Set();
  return parsed.filter((task) => {
    if (!isValidTask(task) || seenIds.has(task.id)) return false;
    seenIds.add(task.id);
    return true;
  });
}

export function loadTasks() {
  let raw;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    // プライベートモードなどで localStorage が使えない場合は空で始める
    return [];
  }
  if (!raw) return [];

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    // JSON が壊れている場合は、上書きで失われないよう元データを退避する
    backupRaw(raw);
    return [];
  }

  const tasks = sanitize(parsed);
  if (!Array.isArray(parsed) || tasks.length !== parsed.length) {
    backupRaw(raw);
  }
  return tasks;
}

export function saveTasks(json) {
  try {
    localStorage.setItem(STORAGE_KEY, json);
  } catch {
    // 容量超過・ストレージ無効時は保存を諦める（画面上の操作は続けられる）
  }
}
