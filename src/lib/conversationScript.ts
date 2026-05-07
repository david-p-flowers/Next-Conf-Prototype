export type MessageType =
  | "user_message"
  | "thinking"
  | "system_text"
  | "question"
  | "question_answer_inline"
  | "created_item"
  | "side_panel"
  | "wait_for_input"
  | "wait_for_submit";

export interface UserMessage {
  type: "user_message";
  text: string;
  delayMs: number;
}

export interface ThinkingStep {
  type: "thinking";
  durationSeconds: number;
  delayMs: number;
}

export interface SystemText {
  type: "system_text";
  text: string;
  delayMs: number;
  streamWordsPerSecond?: number;
}

export interface QuestionStep {
  type: "question";
  title: string;
  options: string[];
  allowCustom?: boolean;
  customPlaceholder?: string;
  delayMs: number;
}

export interface QuestionAnswerInline {
  type: "question_answer_inline";
  title: string;
  answer: string;
  delayMs: number;
}

export interface CreatedItemStep {
  type: "created_item";
  title: string;
  subtitle: string;
  delayMs: number;
  animationDelay?: number;
}

export interface SidePanelStep {
  type: "side_panel";
  data: SidePanelData;
  delayMs: number;
}

export interface WaitForInput {
  type: "wait_for_input";
  triggerText?: string;
}

export interface WaitForSubmit {
  type: "wait_for_submit";
}

export interface SidePanelData {
  title: string;
  fields: { label: string; value: string; icon?: string }[];
  opportunityCriteria: string;
  trigger: { label: string; schedule: string };
  action: { label: string; description: string };
  ctaLabel: string;
}

export type ConversationStep =
  | UserMessage
  | ThinkingStep
  | SystemText
  | QuestionStep
  | QuestionAnswerInline
  | CreatedItemStep
  | SidePanelStep
  | WaitForInput
  | WaitForSubmit;

export const conversationScript: ConversationStep[] = [
  // =============================================
  // PHASE 1: The Ask
  // User lands on Quill and types a real goal.
  // This is the "can it understand me?" moment.
  // =============================================
  {
    type: "wait_for_input",
    triggerText:
      "Our food and dining content is losing visibility. Find what needs refreshing and fix it.",
  },

  {
    type: "user_message",
    text: "Our food and dining content is losing visibility. Find what needs refreshing and fix it.",
    delayMs: 0,
  },

  // =============================================
  // PHASE 2: Quill Understands
  // The "whoa" moment. Quill doesn't ask clarifying
  // questions first -- it already knows the landscape.
  // Lead with insight, then evidence.
  // =============================================
  {
    type: "thinking",
    durationSeconds: 5,
    delayMs: 400,
  },

  // Beat 1: The hook. One confident observation.
  {
    type: "system_text",
    text: "Your food and dining pages are your biggest content surface, but they're slipping. Citation rate is down 1.4% over the last 90 days while competitors like Eater and Infatuation are picking up the queries you used to own.",
    delayMs: 200,
    streamWordsPerSecond: 70,
  },

  // Beat 2: The evidence. Now we layer in specifics.
  {
    type: "system_text",
    text: "I looked across 312 pages in /experiences and /blog. The pattern is clear: closed restaurants still listed, pre-2025 pricing, and missing structured data. These are trust signals that AI models weigh heavily when deciding who to cite.",
    delayMs: 600,
    streamWordsPerSecond: 70,
  },

  // Beat 3: Transition to collaboration
  {
    type: "system_text",
    text: "I can build a play to fix this. Two quick questions so I get the scope right:",
    delayMs: 500,
    streamWordsPerSecond: 60,
  },

  // =============================================
  // PHASE 3: Collaboration
  // Two questions. The first anchors scope,
  // the second shows Quill has smart defaults.
  // This is where the audience sees "copilot, not autopilot."
  // =============================================

  // Question 1: What to prioritize
  {
    type: "question",
    title: "What should we prioritize?",
    options: [
      "Biggest traffic drops first",
      "Pages missing structured data",
      "Oldest content first",
      "Quill, you decide",
    ],
    delayMs: 400,
  },

  { type: "wait_for_submit" },

  // Question 2: Cadence
  {
    type: "question",
    title: "How often should this run?",
    options: ["One-shot", "Weekly", "Bi-weekly", "Monthly"],
    allowCustom: true,
    customPlaceholder: "Something else...",
    delayMs: 400,
  },

  { type: "wait_for_submit" },

  // =============================================
  // PHASE 4: The Recommendation
  // Quill synthesizes the answers into a plan.
  // Conversational, not slide-deck. Each beat
  // should feel like a smart colleague talking.
  // =============================================
  {
    type: "thinking",
    durationSeconds: 4,
    delayMs: 400,
  },

  {
    type: "system_text",
    text: "Here's what I'd build.",
    delayMs: 200,
    streamWordsPerSecond: 60,
  },

  {
    type: "system_text",
    text: "A bi-weekly refresh play targeting your food and dining pages. Each cycle, I'll pull the highest-priority pages into your inbox based on declining citations and outdated references. You review, approve, and the playbook handles the rest.",
    delayMs: 400,
    streamWordsPerSecond: 65,
  },

  {
    type: "system_text",
    text: "The playbook itself is a 5-step refresh: verify local business info, rewrite intros with current data, add structured FAQs for AI citation pickup, update internal links, and validate schema markup.",
    delayMs: 400,
    streamWordsPerSecond: 65,
  },

  {
    type: "system_text",
    text: "Want me to create it?",
    delayMs: 500,
    streamWordsPerSecond: 60,
  },

  // =============================================
  // PHASE 5: The Green Light
  // User says go. Keep this tight.
  // =============================================
  {
    type: "wait_for_input",
    triggerText: "Let's do it",
  },

  {
    type: "user_message",
    text: "Let's do it",
    delayMs: 0,
  },

  // =============================================
  // PHASE 6: The Build
  // This is the magic moment. Thinking animation,
  // then cards appearing one by one. Give each
  // card room to breathe. The side panel is the
  // climax -- don't explain it, just reveal it.
  // =============================================
  {
    type: "thinking",
    durationSeconds: 6,
    delayMs: 400,
  },

  {
    type: "system_text",
    text: "Building your play now.",
    delayMs: 200,
    streamWordsPerSecond: 60,
  },

  // Card 1: Playbook created
  {
    type: "created_item",
    title: "Food & Dining Content Refresh",
    subtitle: "Playbook created",
    delayMs: 1000,
    animationDelay: 0,
  },

  // Card 2: Strategy created
  {
    type: "created_item",
    title: "Declining Food Pages",
    subtitle: "Strategy created",
    delayMs: 800,
    animationDelay: 2400,
  },

  // Card 3: Play created (the thing that ties them together)
  {
    type: "created_item",
    title: "Food & Dining Experience Refresh",
    subtitle: "Play created",
    delayMs: 800,
    animationDelay: 2400,
  },

  // One line, then the panel. Let the panel do the talking.
  {
    type: "system_text",
    text: "Everything is wired up. Here's your play:",
    delayMs: 1000,
    streamWordsPerSecond: 60,
  },

  // The reveal
  {
    type: "side_panel",
    data: {
      title: "Brief",
      fields: [
        { label: "Topic", value: "Food & Dining", icon: "dot" },
        { label: "Folder", value: "/experiences, /blog", icon: "folder" },
        { label: "Action", value: "Content Refresh" },
        { label: "Brand Kit", value: "Acme Experiences" },
      ],
      opportunityCriteria:
        "Pages with declining citation rates, outdated business references, pre-2025 content, or missing FAQ schema. Prioritized by existing traffic volume.",
      trigger: {
        label: "Schedule",
        schedule: "Every 2 weeks on Monday at 9:00 AM EST",
      },
      action: {
        label: "Food & Dining Content Refresh",
        description:
          "5-step playbook: verify local business info, rewrite intros with current data, add structured FAQs, update internal links, validate schema markup.",
      },
      ctaLabel: "Publish Play",
    },
    delayMs: 800,
  },
];