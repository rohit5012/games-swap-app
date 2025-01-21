import { CardContent } from "../ui/Card";
import ChatUserInfo from "./ChatUserInfo";
import SmList from "./SmList";

function ChatList() {
  return (
    <CardContent className="p-0 flex-1 flex flex-col">
      <ChatUserInfo />
      <SmList />
    </CardContent>
  );
}

export default ChatList;
