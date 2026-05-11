import config from "@/data/config.json";

export type InboxTagType = "question" | "review";

export interface InboxItem {
  id: string;
  playName: string;
  message: string;
  unread: boolean;
  tag?: InboxTagType;
  time: string;
}

export const inboxItems: InboxItem[] = config.inbox as InboxItem[];
