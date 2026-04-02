import type { AssessmentResult } from "./scoring";

export interface HistoryEntry {
  id: string;
  date: string;
  results: AssessmentResult;
}

const STORAGE_KEY = "soulsync_history";

export function saveResult(results: AssessmentResult): HistoryEntry {
  const entry: HistoryEntry = {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    results,
  };
  const history = getHistory();
  history.unshift(entry);
  // Keep last 20 entries
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 20)));
  return entry;
}

export function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
