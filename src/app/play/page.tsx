import Sidebar from "@/components/Sidebar";
import PlayDetailView from "@/components/play/PlayDetailView";

export default function PlayPage() {
  return (
    <div className="flex w-full h-screen">
      <Sidebar activeItem="plays" />
      <PlayDetailView />
    </div>
  );
}
