import Sidebar from "@/components/Sidebar";
import ChatEngine from "@/components/chat/ChatEngine";

export default function Home() {
  return (
    <div className="flex gap-2 p-3 w-full h-screen bg-[#f7f6f3]">
      <Sidebar />
      <ChatEngine />
    </div>
  );
}
