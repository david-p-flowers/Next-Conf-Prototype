import Sidebar from "@/components/Sidebar";
import ChatEngine from "@/components/chat/ChatEngine";

export default function Home() {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <ChatEngine />
    </div>
  );
}
