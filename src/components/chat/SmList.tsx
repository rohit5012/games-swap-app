import { LucideSearch } from "lucide-react";
import { Input } from "../ui/Input";
import { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import AddUser from "./AddUser";
import { useChatStore } from "@/lib/chatStore";
import { useUserStore } from "@/lib/userStore";

function SmList() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");

  const { changeChat } = useChatStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    setLoading(true);
    if (currentUser) {
      const unsub = onSnapshot(
        doc(db, "userchats", currentUser.userId),
        async (res) => {
          const items = res.data().chats;

          const promises = items.map(async (item) => {
            const userDocRef = doc(db, "user details", item.receiverId);
            const userDocSnap = await getDoc(userDocRef);

            const user = userDocSnap.data();

            return { ...item, user };
          });
          const chatData = await Promise.all(promises);

          setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        }
      );

      setLoading(false);
      return () => {
        unsub();
      };
    }
    setLoading(false);
  }, [currentUser.userId]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.userId);

    try {
      await updateDoc(userChatsRef, { chats: userChats });
      changeChat(chat.chatId, chat.user);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredChats = chats.filter((c) =>
    c.user.nickname.toLowerCase().includes(input.toLowerCase())
  );

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="flex-1  overflow-scroll scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
      <div className="flex border-b-2 items-center gap-2 p-2">
        <div className="flex">
          <LucideSearch
            className="relative left-7 bottom-5 transform translate-y-[1.85rem] text-muted-foreground"
            size={22}
          />
          <Input
            className="w-full pl-10 pr-4"
            type="search"
            placeholder="Search chats"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <AddUser />
      </div>

      {filteredChats.map((chat) => (
        <div
          key={chat.chatId}
          className={`flex items-center gap-5 p-5 cursor-pointer border-b-2 ${
            !chat?.isSeen ? "bg-blue-300" : "bg-white"
          }`}
          onClick={() => handleSelect(chat)}
        >
          <img
            className="w-12 h-12 rounded-lg object-cover"
            src={
              chat.user.avatarUrl ||
              "https://t3.ftcdn.net/jpg/01/12/43/90/360_F_112439016_DkgjEftsYWLvlYtyl7gVJo1H9ik7wu1z.jpg"
            }
            alt="avatar"
          />
          <div className="flex flex-col gap-2">
            <span className="font-semibold">{chat.user.nickname}</span>
            <p className="text-sm font-light">{chat.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SmList;
