import { Card } from "../components/ui/Card";
import Chat from "../components/chat/Chat";

import ChatList from "../components/chat/ChatList";
import { useChatStore } from "@/lib/chatStore";
import { useEffect } from "react";
import { useUserStore } from "@/lib/userStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
function Messages() {
  const { chatId } = useChatStore();
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="flex justify-center h-[71vh] mt-6">
      {currentUser ? (
        <Card className="flex w-4/5 h-4/5">
          <ChatList />
          {chatId && <Chat />}
        </Card>
      ) : (
        <p>Please Sign In</p>
      )}
    </div>
  );
}

export default Messages;
