import { Card } from "../components/ui/Card";
import Chat from "../components/chat/Chat";
import ChatDetail from "../components/chat/ChatDetail";
import ChatList from "../components/chat/ChatList";
import { useAuth } from "@/hooks/useAuth";
function Messages() {
  const { user } = useAuth();

  return (
    <div className="flex justify-center h-[61rem] mt-6">
      {user ? (
        <Card className="flex w-4/5 h-4/5">
          <ChatList />
          <Chat />
          <ChatDetail />
        </Card>
      ) : (
        <p>Please Sign In</p>
      )}
    </div>
  );
}

export default Messages;
