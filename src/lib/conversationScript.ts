export type MessageType =
  | "user_message"
  | "thinking"
  | "system_text"
  | "chart"
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

export interface ChartStep {
  type: "chart";
  title: string;
  value: string;
  change: string;
  changeDirection: "up" | "down";
  data: { date: string; value: number }[];
  delayMs: number;
}

export interface SidePanelStep {
  type: "side_panel";
  data: SidePanelData;
  delayMs: number;
}

export interface WaitForInput {
  type: "wait_for_input";
  triggerText?: string;
  suggestions?: string[];
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
  | ChartStep
  | QuestionStep
  | QuestionAnswerInline
  | CreatedItemStep
  | SidePanelStep
  | WaitForInput
  | WaitForSubmit;

export interface SamplePrompt {
  text: string;
  highlighted?: boolean;
}

export const samplePrompts: SamplePrompt[] = [
  {
    text: "How is our citation rate doing for food and dining content?",
    highlighted: true,
  },
  { text: "Booking Intent is up 0.9% – build a play to double down" },
  { text: "What prompts are people asking about Experiences where we don't show up?" },
  { text: "Our Experiences blog hasn't been updated in 6 months – find what's gone stale and fix it" },
];

const citationChartData = [
  { date: "Mar 15", value: 9.8 },
  { date: "Mar 20", value: 9.4 },
  { date: "Mar 25", value: 9.1 },
  { date: "Mar 30", value: 8.7 },
  { date: "Apr 03", value: 8.5 },
  { date: "Apr 07", value: 8.2 },
  { date: "Apr 10", value: 8.4 },
  { date: "Apr 14", value: 8.1 },
  { date: "Apr 17", value: 7.9 },
  { date: "Apr 21", value: 8.0 },
  { date: "Apr 24", value: 7.8 },
  { date: "Apr 28", value: 8.4 },
];

export const conversationScript: ConversationStep[] = [
  // =============================================
  // PHASE 1: The Insight Question
  // User asks how their content is performing.
  // =============================================
  {
    type: "wait_for_input",
    triggerText:
      "How is our citation rate doing for food and dining content?",
  },

  {
    type: "user_message",
    text: "How is our citation rate doing for food and dining content?",
    delayMs: 0,
  },

  // =============================================
  // PHASE 2: Quill Responds with Data
  // Summary text, then an inline chart, then
  // interpretation. This is the "whoa" moment.
  // =============================================
  {
    type: "thinking",
    durationSeconds: 5,
    delayMs: 400,
  },

  {
    type: "system_text",
    text: "Your food and dining citation rate has been declining. Over the last 90 days it dropped from 9.8% to 8.4% — that's a 1.4% slide. Here's the trend:",
    delayMs: 200,
    streamWordsPerSecond: 70,
  },

  {
    type: "chart",
    title: "Citation Rate",
    value: "8.4%",
    change: "-1.4%",
    changeDirection: "down",
    data: citationChartData,
    delayMs: 600,
  },

  {
    type: "system_text",
    text: "Competitors like Eater and Infatuation are picking up the queries you used to own. The pattern across your 312 food pages is clear: closed restaurants still listed, pre-2025 pricing, and missing structured data. These are trust signals that AI models weigh heavily when deciding who to cite.",
    delayMs: 600,
    streamWordsPerSecond: 65,
  },

  // =============================================
  // PHASE 3: User Asks How to Improve
  // =============================================
  {
    type: "wait_for_input",
    triggerText: "How do I improve this?",
    suggestions: [
      "How do I improve this?",
      "Which pages are most at risk?",
      "Show me citation share too",
    ],
  },

  {
    type: "user_message",
    text: "How do I improve this?",
    delayMs: 0,
  },

  // =============================================
  // PHASE 4: Quill Recommends a Play
  // =============================================
  {
    type: "thinking",
    durationSeconds: 4,
    delayMs: 400,
  },

  {
    type: "system_text",
    text: "The fastest way to recover is a systematic content refresh. I can create a play that automatically finds your most at-risk pages and runs a 5-step refresh playbook: verify local business info, rewrite intros with current data, add structured FAQs for AI citation pickup, update internal links, and validate schema markup.",
    delayMs: 200,
    streamWordsPerSecond: 65,
  },

  {
    type: "system_text",
    text: "Want me to create it? I just need a couple of inputs to get the scope right.",
    delayMs: 500,
    streamWordsPerSecond: 60,
  },

  // =============================================
  // PHASE 5: User Says Yes
  // =============================================
  {
    type: "wait_for_input",
    triggerText: "Yes, let's create it",
    suggestions: [
      "Yes, let's create it",
      "Tell me more about plays",
    ],
  },

  {
    type: "user_message",
    text: "Yes, let's create it",
    delayMs: 0,
  },

  // =============================================
  // PHASE 6: Collaboration
  // Two quick questions to scope the play.
  // =============================================

  {
    type: "system_text",
    text: "Two quick questions so I get the scope right:",
    delayMs: 400,
    streamWordsPerSecond: 60,
  },

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
  // PHASE 7: The Build
  // Thinking, cards, side panel reveal.
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

  {
    type: "created_item",
    title: "Food & Dining Content Refresh",
    subtitle: "Playbook created",
    delayMs: 1000,
    animationDelay: 0,
  },

  {
    type: "created_item",
    title: "Declining Food Pages",
    subtitle: "Strategy created",
    delayMs: 800,
    animationDelay: 2400,
  },

  {
    type: "created_item",
    title: "Food & Dining Experience Refresh",
    subtitle: "Play created",
    delayMs: 800,
    animationDelay: 2400,
  },

  {
    type: "system_text",
    text: "Everything is wired up. Here's your play:",
    delayMs: 1000,
    streamWordsPerSecond: 60,
  },

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