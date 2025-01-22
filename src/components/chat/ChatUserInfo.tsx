import { useUserStore } from "@/lib/userStore";
import { LucideEdit, LucideEllipsis } from "lucide-react";

function ChatUserInfo() {
  const { currentUser } = useUserStore();

  return (
    <div className="p-5 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <img
          className="w-12 h-12 rounded-lg object-cover"
          src={
            currentUser.avatarUrl ||
            "https://t3.ftcdn.net/jpg/01/12/43/90/360_F_112439016_DkgjEftsYWLvlYtyl7gVJo1H9ik7wu1z.jpg"
          }
        />
        <h2 className="font-semibold">{currentUser.nickname}</h2>
      </div>
      <div className="flex gap-5">
        <LucideEllipsis className="size-5 cursor-pointer" />
        <LucideEdit className="size-5 cursor-pointer" />
      </div>
    </div>
  );
}

export default ChatUserInfo;
