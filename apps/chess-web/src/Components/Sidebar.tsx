"use client";

import {
  ChartBar,
  Gamepad,
  History,
  PlusCircle,
  UsersRoundIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import "../app/globals.css";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "./Button";
import { useWs } from "@/context/wscontext";


const Sidebar = React.memo(function SideBar() {
  const router = useRouter();
  const currentTab = useRef<string>(null);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const socket=useWs();
  const handleTabClick = (tab: string, route: string) => {
    setSelectedTab(tab);
    currentTab.current = tab;
    router.replace(`/${route}`);
  };
  console.log(currentTab.current);
  console.log(selectedTab);
  const tabs = [
    { id: "History",
      label: "History",
      icon: <History />,
      route: "history"
    },
    {
      id: "Analysis",
      label: "Analysis",
      icon: <ChartBar />,
      route: "analytics",
    },
    {
      id: "friends",
      label: "Friends",
      icon: <UsersRoundIcon />,
      route: "friends",
    },
  ];
  useEffect(() => {
    const tab = currentTab.current;
    if (tab != null) {
      setSelectedTab(tab);
    }
  }, []);

  const createGame=useCallback(()=>{
    socket?.sendMessage(JSON.stringify({type:"INIT_GAME"}))
  },[])

  return (
    <motion.div
      initial={{ width: 150 }}
      className={`h-[96%] ml-2 mt-2  flex flex-col gap-y-10 border-0 bg-white shadow-xl rounded-2xl p-2`}
    >
      <div className="flex justify-center items-center gap-2">
        <section className="bg-[#09C388] rounded-xl p-1  shadow-2xl">
          <Gamepad className="text-white "/>
        </section>
        <div className="font-bold font-sans">ChessTrack</div>
      </div>

      <div className="flex flex-col gap-5">
        <Button styles="bg-[#09C388] shadow-xl text-white rounded-xl flex justify-center items-center  py-5 px-2 flex-wrap"
            callback={createGame}
        >
          <PlusCircle/> Create Game
        </Button>
        {tabs.map((tab) => {
          return (
            <button
              key={tab.id}
              id={tab.id}
              onClick={() => handleTabClick(tab.id, tab.route)}
              className={`
                text-neutral-500
                hover:bg-zinc-200
                flex items-center gap-3 py-2  rounded-lg w-full justify-center
                transition-all px-6 
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
});

export default Sidebar;
