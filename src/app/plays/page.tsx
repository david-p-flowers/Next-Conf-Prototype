import Sidebar from "@/components/Sidebar";
import PlaysListView from "@/components/play/PlaysListView";

export default function PlaysPage() {
  return (
    <div className="flex gap-2 p-3 w-full h-screen bg-[#f7f6f3]">
      <Sidebar activeItem="plays" />
      <PlaysListView />
    </div>
  );
}
