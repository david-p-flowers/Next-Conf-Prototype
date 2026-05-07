"use client";

import Image from "next/image";
import QuillHeroAnimation from "@/components/QuillHeroAnimation";

function SuggestionItem({
  text,
  highlighted,
}: {
  text: string;
  highlighted?: boolean;
}) {
  if (highlighted) {
    return (
      <div className="flex items-center gap-2.5 w-full rounded-lg bg-[rgba(9,9,11,0.04)] pl-2 pr-3 py-1.5">
        <p className="flex-1 min-w-0 text-sm leading-5 text-[#09090b]">
          {text}
        </p>
        <div className="relative shrink-0 w-3 h-3">
          <Image
            src="/icons/arrow-top-right.svg"
            alt=""
            width={12}
            height={12}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full px-2 py-1.5">
      <p className="flex-1 min-w-0 text-sm leading-5 text-[#676c79]">{text}</p>
    </div>
  );
}

export default function MainPanel() {
  return (
    <div className="flex flex-col flex-1 min-w-0 h-[900px] bg-white border-[0.5px] border-[#cfccc8] rounded-xl overflow-hidden">
      <div className="flex flex-col flex-1 min-h-0 items-center justify-center px-4">
        <div className="flex flex-col flex-1 min-h-0 items-center justify-center w-full">
          <div className="flex flex-col gap-10 items-center max-w-[700px] w-full">
            {/* Hero heading */}
            <div className="flex flex-col items-center">
              <div className="flex flex-col gap-3 items-center w-[700px]">
                <div className="flex items-center gap-3 justify-center">
                  <h1
                    className="text-[40px] text-[#1d1b18] whitespace-nowrap"
                    style={{ fontFamily: "'Serrif VF', Georgia, serif" }}
                  >
                    What&apos;s your next play?
                  </h1>
                  <div className="relative shrink-0" style={{ width: 44, height: 44 }}>
                    <QuillHeroAnimation />
                  </div>
                </div>
                <p className="text-base leading-6 text-center text-[#676c79] min-w-full">
                  Quill is your content copilot. Find opportunities, act on
                  them, and measure the impact.
                </p>
              </div>
            </div>

            {/* Prompt input */}
            <div className="flex flex-col items-start w-full px-2">
              <div className="flex flex-col gap-2 items-start w-full bg-white border border-[#ecedef] rounded-lg p-2 overflow-hidden">
                <div className="w-full text-sm leading-5 text-[#808593]">
                  <p className="leading-5">
                    Refresh our buying guides for better AI visibility
                  </p>
                  <p className="leading-5 text-sm">{"\u200B"}</p>
                  <p className="leading-5 text-sm">{"\u200B"}</p>
                </div>
                <div className="flex items-center justify-between w-full">
                  {/* Paperclip button */}
                  <button className="flex items-center justify-center w-6 h-6 rounded-md bg-white py-1.5">
                    <Image
                      src="/icons/paperclip.svg"
                      alt="Attach"
                      width={12}
                      height={12}
                    />
                  </button>

                  <div className="flex items-center gap-2">
                    {/* Model selector */}
                    <button className="flex items-center gap-1.5 bg-white rounded-md px-2 py-0.5">
                      <span className="text-xs leading-[18px] text-[#676c79]">
                        Opus 4.6
                      </span>
                      <div className="relative shrink-0 w-2.5 h-2.5">
                        <Image
                          src="/icons/chevron-down-small.svg"
                          alt=""
                          width={10}
                          height={10}
                        />
                      </div>
                    </button>

                    {/* Send button */}
                    <button className="flex items-center justify-center w-6 h-6 rounded-md bg-[#2f2f37] p-1.5">
                      <Image
                        src="/icons/send.svg"
                        alt="Send"
                        width={10}
                        height={10}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="flex flex-col gap-1 items-start w-full">
              <SuggestionItem text="Booking Intent is up 0.9% - build a play to double down" />
              <SuggestionItem
                text="Find Experience pages that need updating and refresh them to improve citations and visibility"
                highlighted
              />
              <SuggestionItem text="What prompts are people asking about Experiences where we dont show up?" />
              <SuggestionItem text="Our Experiences blog hasn't been updated in 6 months - find what's gone stale and fix it" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
