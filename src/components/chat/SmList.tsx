import { LucideSearch } from "lucide-react";
import { Input } from "../ui/Input";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import AddUser from "./AddUser";

function SmList() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    if (user) {
      const unsub = onSnapshot(doc(db, "userchats", user.uid), async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "user details", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });
        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        console.log(chats);
      });

      setLoading(false);
      return () => {
        unsub();
      };
    }
    setLoading(false);
  }, [user?.uid]);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="flex-1">
      <div className="flex items-center gap-2 p-2">
        <div className="flex">
          <LucideSearch
            className="relative left-7 bottom-5 transform translate-y-[1.85rem] text-muted-foreground"
            size={22}
          />
          <Input
            className="w-full pl-10 pr-4"
            type="search"
            placeholder="Search"
          />
        </div>
        <AddUser />
      </div>
      <div className="h-[94.5%] overflow-scroll scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
        {chats.map((chat) => (
          <div
            key={chat.chatId}
            className="flex items-center gap-5 p-5 cursor-pointer border-b-2"
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
    </div>
  );
}

export default SmList;
