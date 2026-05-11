"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import {
  conversationScript,
  samplePrompts,
  ConversationStep,
} from "@/lib/conversationScript";
import UserBubble from "./UserBubble";
import ThinkingIndicator from "./ThinkingIndicator";
import SystemMessage from "./SystemMessage";
import QuestionForm from "./QuestionForm";
import QuestionAnswerInline from "./QuestionAnswerInline";
import CreatedItem from "./CreatedItem";
import InlineChart from "./InlineChart";
import ChatInput from "./ChatInput";
import SidePanel from "./SidePanel";
import QuillHeroAnimation from "@/components/QuillHeroAnimation";
import type { SidePanelData } from "@/lib/conversationScript";

interface RenderedMessage {
  id: string;
  step: ConversationStep;
  streamComplete?: boolean;
}

export default function ChatEngine() {
  const [messages, setMessages] = useState<RenderedMessage[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  const [isWaitingForInput, setIsWaitingForInput] = useState(true);
  const [isWaitingForSubmit, setIsWaitingForSubmit] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sidePanelData, setSidePanelData] = useState<SidePanelData | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const processingRef = useRef(false);
  const messageIdCounter = useRef(0);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const nextId = () => {
    messageIdCounter.current++;
    return `msg-${messageIdCounter.current}`;
  };

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const processSteps = useCallback(
    async (startIndex: number) => {
      if (processingRef.current) return;
      processingRef.current = true;
      setIsProcessing(true);

      let idx = startIndex;

      while (idx < conversationScript.length) {
        const step = conversationScript[idx];

        if (step.type === "wait_for_input") {
          setIsWaitingForInput(true);
          setSuggestions(step.suggestions || []);
          setIsProcessing(false);
          setCurrentStepIndex(idx + 1);
          processingRef.current = false;
          return;
        }

        if (step.type === "wait_for_submit") {
          setIsWaitingForSubmit(true);
          setIsProcessing(false);
          setCurrentStepIndex(idx + 1);
          processingRef.current = false;
          return;
        }

        if ("delayMs" in step && step.delayMs > 0) {
          await sleep(step.delayMs);
        }

        if (step.type === "thinking") {
          const id = nextId();
          setMessages((prev) => [...prev, { id, step, streamComplete: false }]);
          await sleep(step.durationSeconds * 1000);
          setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, streamComplete: true } : m))
          );
        } else if (step.type === "system_text") {
          const id = nextId();
          setMessages((prev) => [...prev, { id, step, streamComplete: false }]);
          const words = step.text.split(" ").length;
          const wps = step.streamWordsPerSecond || 60;
          const streamTime = (words / wps) * 1000;
          await sleep(streamTime + 100);
          setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, streamComplete: true } : m))
          );
        } else if (step.type === "chart") {
          const id = nextId();
          setMessages((prev) => [...prev, { id, step, streamComplete: false }]);
          await sleep(800);
          setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, streamComplete: true } : m))
          );
        } else if (step.type === "question") {
          const id = nextId();
          setMessages((prev) => [...prev, { id, step }]);
          idx++;
          setCurrentStepIndex(idx);
          continue;
        } else if (step.type === "side_panel") {
          setSidePanelData(step.data);
          setShowHistory(true);
        } else {
          const id = nextId();
          setMessages((prev) => [...prev, { id, step }]);
        }

        idx++;
        setCurrentStepIndex(idx);
      }

      setIsProcessing(false);
      processingRef.current = false;
    },
    []
  );

  const handleUserInput = useCallback(
    (text: string) => {
      setIsWaitingForInput(false);
      setSuggestions([]);
      setShowHistory(true);

      const nextStep = conversationScript[currentStepIndex];
      if (nextStep?.type === "user_message") {
        const id = nextId();
        setMessages((prev) => [
          ...prev,
          { id, step: { ...nextStep, text } },
        ]);
        setCurrentStepIndex(currentStepIndex + 1);
        processSteps(currentStepIndex + 1);
      } else {
        processSteps(currentStepIndex);
      }
    },
    [currentStepIndex, processSteps]
  );

  const handleQuestionSubmit = useCallback(
    (answer: string) => {
      setIsWaitingForSubmit(false);
      setMessages((prev) => {
        const updated = [...prev];
        const qIndex = updated.findIndex((m) => m.step.type === "question");
        if (qIndex >= 0) {
          updated[qIndex] = {
            ...updated[qIndex],
            step: {
              type: "question_answer_inline",
              title: (updated[qIndex].step as { title: string }).title,
              answer,
              delayMs: 0,
            },
          };
        }
        return updated;
      });
      processSteps(currentStepIndex);
    },
    [currentStepIndex, processSteps]
  );

  const renderMessage = (msg: RenderedMessage) => {
    const { step, id, streamComplete } = msg;

    switch (step.type) {
      case "user_message":
        return <UserBubble key={id} text={step.text} />;
      case "thinking":
        return (
          <ThinkingIndicator
            key={id}
            durationSeconds={step.durationSeconds}
            isComplete={streamComplete ?? true}
          />
        );
      case "system_text":
        return (
          <SystemMessage
            key={id}
            text={step.text}
            streamWordsPerSecond={step.streamWordsPerSecond}
          />
        );
      case "question":
        return (
          <QuestionForm
            key={id}
            title={step.title}
            options={step.options}
            allowCustom={step.allowCustom}
            customPlaceholder={step.customPlaceholder}
            onSubmit={handleQuestionSubmit}
          />
        );
      case "question_answer_inline":
        return (
          <QuestionAnswerInline
            key={id}
            title={step.title}
            answer={step.answer}
          />
        );
      case "created_item":
        return (
          <CreatedItem
            key={id}
            title={step.title}
            subtitle={step.subtitle}
            animationDelay={step.animationDelay}
          />
        );
      case "chart":
        return (
          <InlineChart
            key={id}
            title={step.title}
            value={step.value}
            change={step.change}
            changeDirection={step.changeDirection}
            data={step.data}
          />
        );
      default:
        return null;
    }
  };

  const showHomepage = messages.length === 0 && isWaitingForInput;

  return (
    <div className="flex flex-1 min-w-0 h-full">
      <div className="flex flex-col flex-1 min-w-0 h-full bg-white overflow-hidden">
        {showHomepage ? (
          <div className="flex flex-col flex-1 items-center justify-center px-4">
            <div className="flex flex-col gap-10 items-center max-w-[700px] w-full">
              {/* Hero heading */}
              <div className="flex flex-col gap-3 items-center w-full">
                <div className="flex items-center gap-3 justify-center">
                  <h1
                    className="text-[40px] text-[#1d1b18] whitespace-nowrap"
                    style={{ fontFamily: "'Serrif VF', Georgia, serif" }}
                  >
                    What&apos;s your next Play?
                  </h1>
                  <div className="relative shrink-0" style={{ width: 31, height: 31 }}>
                    <QuillHeroAnimation />
                  </div>
                </div>
                <p className="text-base leading-6 text-center text-[#676c79]">
                  Quill is your content copilot. Find opportunities, act on them,
                  and measure the impact.
                </p>
              </div>

              {/* Input */}
              <div className="w-full px-2">
                <ChatInput
                  onSend={handleUserInput}
                  disabled={false}
                  placeholder="Refresh our buying guides for better AI visibility"
                />
              </div>

              {/* Sample prompts */}
              <div className="flex flex-col gap-1 w-full">
                {samplePrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleUserInput(prompt.text)}
                    className="flex items-center gap-2.5 w-full rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-[rgba(9,9,11,0.04)] group"
                  >
                    <span className="flex-1 min-w-0 text-[14px] leading-5 text-[#676c79] group-hover:text-[#09090b]">
                      {prompt.text}
                    </span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <path d="M3.5 8.5L8.5 3.5M8.5 3.5H5M8.5 3.5V7" stroke="#09090b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            {showHistory && (
              <div className="flex items-center justify-end px-4 py-3 shrink-0">
                <button className="flex items-center gap-1.5 text-[13px] text-[#1d1b18] border border-[#ecedef] rounded-md px-3 py-1.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5.5" stroke="#1d1b18" strokeWidth="1" />
                    <path d="M7 4v3.5l2 1.5" stroke="#1d1b18" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                  History
                </button>
              </div>
            )}

            {/* Chat messages */}
            <div
              ref={scrollRef}
              className="flex flex-col flex-1 min-h-0 overflow-y-auto px-6 pb-4"
            >
              <div className="flex flex-col gap-3 pt-4 max-w-[700px] mx-auto w-full">
                <AnimatePresence mode="popLayout">
                  {messages.map(renderMessage)}
                </AnimatePresence>
              </div>
            </div>

            {/* Suggestion bubbles */}
            {suggestions.length > 0 && isWaitingForInput && (
              <div className="flex flex-wrap gap-2 px-6 pb-3 max-w-[700px] mx-auto w-full">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleUserInput(s)}
                    className="text-[13px] text-[#1d1b18] px-3 py-1.5 rounded-full border border-[#ecedef] bg-white hover:bg-[#f7f6f3] transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Chat input pinned to bottom */}
            <div className="pb-4 pt-2 shrink-0 max-w-[700px] mx-auto w-full">
              <ChatInput
                onSend={handleUserInput}
                disabled={isProcessing || isWaitingForSubmit}
                placeholder="Type / for commands"
              />
            </div>
          </>
        )}
      </div>

      {/* Side Panel */}
      <AnimatePresence>
        {sidePanelData && <SidePanel data={sidePanelData} />}
      </AnimatePresence>
    </div>
  );
}
