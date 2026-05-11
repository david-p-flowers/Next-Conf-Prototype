import Sidebar from "@/components/Sidebar";
import PlaysListView from "@/components/play/PlaysListView";

export default function PlaysPage() {
  return (
    <div className="flex w-full h-screen">
      <Sidebar activeItem="plays" />
      <PlaysListView />
    </div>
  );
}
