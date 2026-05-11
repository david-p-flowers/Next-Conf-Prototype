import Sidebar from "@/components/Sidebar";
import InboxView from "@/components/inbox/InboxView";

export default function InboxPage() {
  return (
    <div className="flex w-full h-screen">
      <Sidebar activeItem="inbox" />
      <InboxView />
    </div>
  );
}
