import { inboxItems as staticItems, type InboxItem } from "./inboxData";

const STORAGE_KEY = "quill-inbox-items";
const READ_KEY = "quill-inbox-read-ids";

function ensureSeeded(): InboxItem[] {
  if (typeof window === "undefined") return staticItems;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(staticItems));
    return staticItems;
  } catch {
    return staticItems;
  }
}

function getAllItems(): InboxItem[] {
  return ensureSeeded();
}

function saveItems(items: InboxItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch { /* quota exceeded */ }
}

function getReadIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(READ_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

function saveReadIds(ids: Set<string>) {
  try {
    localStorage.setItem(READ_KEY, JSON.stringify([...ids]));
  } catch { /* quota exceeded */ }
}

export function getInboxItems(): InboxItem[] {
  const readIds = getReadIds();
  return getAllItems().map((item) => ({
    ...item,
    unread: readIds.has(item.id) ? false : item.unread,
  }));
}

export function addInboxItem(item: InboxItem): void {
  const current = getAllItems();
  if (current.some((i) => i.id === item.id)) return;
  saveItems([item, ...current]);
}

export function markAsRead(id: string): void {
  const readIds = getReadIds();
  readIds.add(id);
  saveReadIds(readIds);
}

export function getUnreadCount(): number {
  return getInboxItems().filter((i) => i.unread).length;
}
