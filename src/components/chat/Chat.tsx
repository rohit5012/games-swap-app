import { LucideInfo } from "lucide-react";
import { CardContent } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useEffect, useRef, useState } from "react";

function Chat() {
  // const [open, setOpen] = useState(false);
  // const [text, setText] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <CardContent className="flex flex-col flex-[2_2_0%] border-x-2 h-full p-0">
      <div className="flex p-5 items-center justify-between border-b-2">
        <div className="flex items-center gap-5">
          <img
            className="w-16 h-16 rounded-lg object-cover"
            src="https://t3.ftcdn.net/jpg/01/12/43/90/360_F_112439016_DkgjEftsYWLvlYtyl7gVJo1H9ik7wu1z.jpg"
          />
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-lg">Jane Doe</span>
            <p className="text-sm font-light text-slate-600">Lorem Ipsum</p>
          </div>
        </div>
        <div className="flex">
          <LucideInfo className="size-5" />
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col gap-5 overflow-scroll scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
        <div className="max-w-[70%] flex gap-5">
          <img
            className="w-8 h-8 rounded-lg object-cover"
            src="https://t3.ftcdn.net/jpg/01/12/43/90/360_F_112439016_DkgjEftsYWLvlYtyl7gVJo1H9ik7wu1z.jpg"
          />
          <div className="flex-1 flex flex-col gap-1">
            <p className="p-5 bg-slate-200 rounded-lg">
              Blah blah blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah blah
            </p>
            <span className="text-sm">1 minute ago</span>
          </div>
        </div>
        <div className="max-w-[70%] flex gap-5 self-end">
          <div className="flex-1 flex flex-col gap-1">
            <p className="p-5 bg-green-600 rounded-lg text-white">
              Blah blah blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah blah
            </p>
            <span className="text-sm">1 minute ago</span>
          </div>
        </div>
        <div className="max-w-[70%] flex gap-5">
          <img
            className="w-8 h-8 rounded-lg object-cover"
            src="https://t3.ftcdn.net/jpg/01/12/43/90/360_F_112439016_DkgjEftsYWLvlYtyl7gVJo1H9ik7wu1z.jpg"
          />
          <div className="flex-1 flex flex-col gap-1">
            <p className="p-5 bg-slate-200 rounded-lg">
              Blah blah blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah blah
            </p>
            <span className="text-sm">1 minute ago</span>
          </div>
        </div>
        <div className="max-w-[70%] flex gap-5 self-end">
          <div className="flex-1 flex flex-col gap-1">
            <p className="p-5 bg-green-600 rounded-lg text-white">
              Blah blah blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah blah
            </p>
            <span className="text-sm">1 minute ago</span>
          </div>
        </div>
        <div className="max-w-[70%] flex gap-5">
          <img
            className="w-8 h-8 rounded-lg object-cover"
            src="https://t3.ftcdn.net/jpg/01/12/43/90/360_F_112439016_DkgjEftsYWLvlYtyl7gVJo1H9ik7wu1z.jpg"
          />
          <div className="flex-1 flex flex-col gap-1">
            <p className="p-5 bg-slate-200 rounded-lg">
              Blah blah blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah blah
            </p>
            <span className="text-sm">1 minute ago</span>
          </div>
        </div>
        <div className="max-w-[70%] flex gap-5 self-end">
          <div className="flex-1 flex flex-col gap-1">
            <p className="p-5 bg-green-600 rounded-lg text-white">
              Blah blah blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah blah
            </p>
            <span className="text-sm">1 minute ago</span>
          </div>
        </div>
        <div className="max-w-[70%] flex gap-5">
          <img
            className="w-8 h-8 rounded-lg object-cover"
            src="https://t3.ftcdn.net/jpg/01/12/43/90/360_F_112439016_DkgjEftsYWLvlYtyl7gVJo1H9ik7wu1z.jpg"
          />
          <div className="flex-1 flex flex-col gap-1">
            <p className="p-5 bg-slate-200 rounded-lg">
              Blah blah blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah blah
            </p>
            <span className="text-sm">1 minute ago</span>
          </div>
        </div>
        <div className="max-w-[70%] flex gap-5 self-end">
          <div className="flex-1 flex flex-col gap-1">
            <p className="p-5 bg-green-600 rounded-lg text-white">
              Blah blah blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah blah
            </p>
            <span className="text-sm">1 minute ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="p-5 flex items-center justify-between border-t-2 gap-2 mt-auto">
        <Input type="text" placeholder="Type a message" />
        <Button className="h-10">Send</Button>
      </div>
    </CardContent>
  );
}

export default Chat;
