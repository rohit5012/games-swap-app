import { LucideInfo } from "lucide-react";
import { CardContent } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useEffect, useRef, useState } from "react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useChatStore } from "@/lib/chatStore";
import { useUserStore } from "@/lib/userStore";
// import TimeAgo from "timeago-react";
import { Link } from "react-router";

function Chat() {
  const [text, setText] = useState("");

  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore();

  const [chat, setChat] = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unsub();
    };
  }, [chatId]);

  const handleSend = async () => {
    if (!text.trim().length) return; // do nothing if not content

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.userId,
          text,
          createdAt: new Date(),
        }),
      });

      const userIds = [currentUser.userId, user.userId];

      userIds.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.userId ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, { chats: userChatsData.chats });
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      setText("");
    }
  };

  return (
    <CardContent className="flex flex-col flex-[2_2_0%] border-x-2 h-full p-0">
      <div className="flex p-5 items-center justify-between border-b-2">
        <div className="flex items-center gap-5">
          <Link to={`/users/${user.userId}`}>
            <img
              className="w-16 h-16 rounded-lg object-cover"
              src={
                user.avatarUrl ||
                "https://t3.ftcdn.net/jpg/01/12/43/90/360_F_112439016_DkgjEftsYWLvlYtyl7gVJo1H9ik7wu1z.jpg"
              }
            />
          </Link>
          <div className="flex flex-col gap-1">
            <Link to={`/users/${user.userId}`}>
              <span className="font-semibold text-lg">{user.nickname}</span>
            </Link>
            <p className="text-sm font-light text-slate-600">{user.location}</p>
          </div>
        </div>
        <div className="flex">
          <LucideInfo className="size-5" />
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col gap-5 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 dark:scrollbar-track-gray-900 dark:scrollbar-thumb-gray-800">
        {chat?.messages?.map((message) => (
          <div
            key={message?.createdAt}
            className={`max-w-[70%] min-w-40 w-fit flex gap-5 ${
              message.senderId === currentUser.userId && "self-end"
            }`}
          >
            <div
              className={`flex-1 flex flex-col gap-1 ${
                message.senderId === currentUser.userId && "text-end"
              }`}
            >
              <p
                className={`p-5 rounded-lg text-white font-medium ${
                  message.senderId === currentUser.userId
                    ? "bg-sky-400"
                    : "bg-green-400"
                }`}
              >
                {message.text}
              </p>
              <TimeAgo
                className="text-xs"
                datetime={message.createdAt.toDate()}
                live
              />
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>
      <div className="p-5 flex items-center justify-between border-t-2 gap-2 mt-auto">
        <Input
          type="text"
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button className="h-10" onClick={handleSend}>
          Send
        </Button>
      </div>
    </CardContent>
  );
}

export default Chat;
