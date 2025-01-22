import { useUserStore } from "@/lib/userStore";
import { LucideEdit, LucideEllipsis } from "lucide-react";
import { Link } from "react-router";

function ChatUserInfo() {
  const { currentUser } = useUserStore();

  return (
    <div className="p-5 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Link to="/user-profile">
          <img
            className="w-12 h-12 rounded-lg object-cover"
            src={
              currentUser.avatarUrl ||
              "https://t3.ftcdn.net/jpg/01/12/43/90/360_F_112439016_DkgjEftsYWLvlYtyl7gVJo1H9ik7wu1z.jpg"
            }
          />
        </Link>
        <Link to="/user-profile">
          <h2 className="font-semibold">{currentUser.nickname}</h2>
        </Link>
      </div>
      <div className="flex gap-5">
      </div>
    </div>
  );
}

export default ChatUserInfo;
