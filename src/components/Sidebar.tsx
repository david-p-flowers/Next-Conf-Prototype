"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  HomeIcon,
  InboxIcon,
  PlaylistIcon,
  StarIcon,
  ClockRewindIcon,
  LightningIcon,
  ChartBarSquareIcon,
  LayersIcon,
  SettingsIcon,
  CircleInfoIcon,
  SearchIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@/components/icons";
import { getUnreadCount } from "@/lib/inboxStore";

const EXPANDED_WIDTH = 220;
const COLLAPSED_WIDTH = 52;
const COLLAPSE_THRESHOLD = 130;

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  hasChevron?: boolean;
  href?: string;
  collapsed?: boolean;
  badge?: number;
}

function NavItem({ icon, label, active, hasChevron, href, collapsed, badge }: NavItemProps) {
  const content = collapsed ? (
    <div className="flex items-center justify-center py-1 w-full" title={label}>
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-md ${
          active ? "bg-[#f7f6f3]" : ""
        }`}
      >
        <div className="shrink-0 flex items-center justify-center text-[#6D6A64]">
          {icon}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center gap-0 pl-3 pr-3 py-0 w-full">
      <div
        className={`flex flex-1 items-center gap-0 min-w-0 px-2 py-1 rounded-md ${
          active ? "bg-[#f7f6f3]" : ""
        }`}
      >
        <div className="flex flex-1 items-center gap-2 min-w-0">
          <div className="shrink-0 flex items-center justify-center text-[#6D6A64]">
            {icon}
          </div>
          <span className="flex-1 min-w-0 text-[13px] font-medium leading-5 text-[#1d1b18] truncate">
            {label}
          </span>
        </div>
        {badge && badge > 0 ? (
          <span className="shrink-0 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#e8edf3] text-[11px] font-medium text-[#676c79]">
            {badge}
          </span>
        ) : null}
        {hasChevron && (
          <div className="shrink-0 flex items-center justify-center w-3 h-3 text-[#6D6A64]">
            <ChevronRightIcon size={12} />
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}

function Divider({ collapsed }: { collapsed?: boolean }) {
  return (
    <div className={`flex items-start overflow-hidden py-2 w-full ${collapsed ? "px-2" : "px-3"}`}>
      <div className="flex-1 min-w-0 h-px bg-[#ecedef]" />
    </div>
  );
}

interface SidebarProps {
  activeItem?: "home" | "plays" | "inbox";
}

export default function Sidebar({ activeItem = "home" }: SidebarProps) {
  const [width, setWidth] = useState(EXPANDED_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStartWidth, setDragStartWidth] = useState(EXPANDED_WIDTH);
  const [inboxBadge, setInboxBadge] = useState(0);

  useEffect(() => {
    setInboxBadge(getUnreadCount());
    const interval = setInterval(() => {
      setInboxBadge(getUnreadCount());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const collapsed = width <= COLLAPSED_WIDTH;

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    setDragStartWidth(width);
  }, [width]);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = e.clientX - 12;
      if (newWidth < COLLAPSE_THRESHOLD) {
        setWidth(COLLAPSED_WIDTH);
      } else {
        setWidth(Math.min(EXPANDED_WIDTH, Math.max(COLLAPSED_WIDTH, newWidth)));
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setWidth((prev) => (prev < COLLAPSE_THRESHOLD ? COLLAPSED_WIDTH : EXPANDED_WIDTH));
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div
      className="relative flex flex-col gap-1 h-full shrink-0 bg-white border-r border-[#ecedef] overflow-hidden py-3 transition-[width] select-none"
      style={{
        width,
        transitionDuration: isResizing ? "0ms" : "200ms",
      }}
    >
      {/* Workspace switcher */}
      <div className={`flex items-center gap-2 pb-2 ${collapsed ? "justify-center px-2" : "px-3"}`}>
        {collapsed ? (
          <div className="flex items-center justify-center w-8 h-8 bg-white border-[0.5px] border-[#cfccc8] rounded-md">
            <div className="relative w-4 h-4">
              <img src="/icons/company-logo.svg" alt="Logo" width={16} height={16} className="object-cover rounded-full" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-1 items-center gap-2 min-w-0 bg-white border-[0.5px] border-[#cfccc8] rounded-md px-2 py-1">
              <div className="flex flex-1 items-center gap-1.5 min-w-0">
                <div className="relative shrink-0 w-4 h-4">
                  <img src="/icons/company-logo.svg" alt="Logo" width={16} height={16} className="object-cover rounded-full" />
                </div>
                <span className="flex-1 min-w-0 text-[13px] font-semibold leading-5 text-[#1d1b18] truncate">
                  Acme Co
                </span>
              </div>
              <ChevronDownIcon size={12} className="shrink-0 text-[#1d1b18]" />
            </div>
            <div className="flex items-center justify-center shrink-0 w-7 h-7 bg-white border-[0.5px] border-[#cfccc8] rounded-md text-[#1d1b18]">
              <SearchIcon size={10} />
            </div>
          </>
        )}
      </div>

      {/* Main nav */}
      <NavItem icon={<HomeIcon size={14} />} label="Home" active={activeItem === "home"} href="/" collapsed={collapsed} />
      <NavItem icon={<InboxIcon size={14} />} label="Inbox" active={activeItem === "inbox"} href="/inbox" collapsed={collapsed} badge={inboxBadge} />
      <NavItem icon={<PlaylistIcon size={14} />} label="Plays" active={activeItem === "plays"} href="/plays" collapsed={collapsed} />

      <Divider collapsed={collapsed} />

      <NavItem icon={<StarIcon size={14} />} label="Favorites" hasChevron collapsed={collapsed} />
      <NavItem icon={<ClockRewindIcon size={14} />} label="Recents" hasChevron collapsed={collapsed} />

      <Divider collapsed={collapsed} />

      <NavItem icon={<LightningIcon size={14} />} label="Actions" hasChevron collapsed={collapsed} />
      <NavItem icon={<ChartBarSquareIcon size={14} />} label="Insights" hasChevron collapsed={collapsed} />
      <NavItem icon={<LayersIcon size={14} />} label="Context" hasChevron collapsed={collapsed} />

      <div className="flex-1 min-h-0" />

      <div className="flex flex-col gap-1 pt-2">
        <Divider collapsed={collapsed} />
        <NavItem icon={<CircleInfoIcon size={14} />} label="Resources" collapsed={collapsed} />
        <NavItem icon={<SettingsIcon size={14} />} label="Settings" collapsed={collapsed} />
      </div>

      {/* Drag handle on right edge */}
      <div
        className={`absolute -right-px top-0 bottom-0 w-1 cursor-col-resize z-10 transition-colors ${
          isResizing ? "bg-[#3b82f6]" : "hover:bg-[#3b82f6]"
        }`}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}
